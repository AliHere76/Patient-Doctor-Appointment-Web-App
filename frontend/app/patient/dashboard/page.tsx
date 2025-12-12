'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { NotificationProvider } from '@/components/NotificationProvider';
import { ConfirmModal } from '@/components/Modal';
import { authAPI, appointmentAPI } from '@/lib/api';
import { User, Appointment } from '@/lib/types';

export default function PatientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    completed: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  // Modal state
  const [cancelModal, setCancelModal] = useState<{ open: boolean; appointmentId: string | null }>({
    open: false,
    appointmentId: null,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Get user profile
      const profileRes = await authAPI.getProfile();
      if (profileRes.success && profileRes.data?.user) {
        setUser(profileRes.data.user);
      } else {
        router.push('/login');
        return;
      }

      // Get appointments
      const appointmentsRes = await appointmentAPI.getMyAppointments();
      if (appointmentsRes.success && appointmentsRes.data) {
        const appts = appointmentsRes.data.appointments;
        setAppointments(appts);

        // Calculate stats
        setStats({
          total: appts.length,
          pending: appts.filter((a) => a.status === 'PENDING').length,
          approved: appts.filter((a) => a.status === 'APPROVED').length,
          completed: appts.filter((a) => a.status === 'COMPLETED').length,
          rejected: appts.filter((a) => a.status === 'REJECTED').length,
        });
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!cancelModal.appointmentId) return;
    const response = await appointmentAPI.cancelAppointment(cancelModal.appointmentId);
    if (response.success) {
      loadData();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'REJECTED':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCancellationContext = (appointment: any) => {
    if (appointment.status === 'CANCELLED') {
      const cancelledBy = appointment.cancelledBy;
      if (cancelledBy === 'PATIENT') {
        return <span className="text-xs text-red-600 ml-2">(Cancelled by you)</span>;
      } else if (cancelledBy === 'DOCTOR') {
        return <span className="text-xs text-red-600 ml-2">(Cancelled by doctor)</span>;
      } else if (cancelledBy === 'ADMIN') {
        return <span className="text-xs text-red-600 ml-2">(Cancelled by admin)</span>;
      }
    }
    if (appointment.status === 'REJECTED') {
      return <span className="text-xs text-orange-600 ml-2">(Rejected by doctor)</span>;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-xl text-gray-300">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <NotificationProvider userId={user.id}>
      <div className="min-h-screen bg-black">
        <Navbar userEmail={user.email} userRole={user.role} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text">Patient Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back, {user.firstName} {user.lastName}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-all">
              <h3 className="text-sm font-semibold text-gray-400">Total</h3>
              <p className="text-3xl font-black text-white mt-2">{stats.total}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 transition-all">
              <h3 className="text-sm font-semibold text-gray-400">Pending</h3>
              <p className="text-3xl font-black text-yellow-500 mt-2">{stats.pending}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <h3 className="text-sm font-semibold text-gray-400">Approved</h3>
              <p className="text-3xl font-black text-green-500 mt-2">{stats.approved}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <h3 className="text-sm font-semibold text-gray-400">Completed</h3>
              <p className="text-3xl font-black text-blue-500 mt-2">{stats.completed}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-all">
              <h3 className="text-sm font-semibold text-gray-400">Rejected</h3>
              <p className="text-3xl font-black text-red-500 mt-2">{stats.rejected}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push('/patient/book-appointment')}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105"
              >
                Book New Appointment
              </button>
              <button
                onClick={() => router.push('/patient/appointments')}
                className="px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-all"
              >
                View All Appointments
              </button>
            </div>
          </div>

          {/* Recent Appointments */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white">Recent Appointments</h2>
            </div>
            <div className="divide-y divide-gray-800">
              {appointments.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No appointments found. Book your first appointment!
                </div>
              ) : (
                appointments.slice(0, 5).map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-800/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <h3 className="text-lg font-semibold text-white">
                            Dr. {(appointment as any).doctorName || appointment.doctorEmail?.split('@')[0] || 'Unknown'}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status}
                          </span>
                          {getCancellationContext(appointment)}
                        </div>
                        {((appointment as any).doctorSpecialization || appointment.doctorSpecialization) && (
                          <p className="text-sm text-gray-400 mt-1">{(appointment as any).doctorSpecialization || appointment.doctorSpecialization}</p>
                        )}
                        <p className="text-sm text-gray-300 mt-2">
                          <span className="font-semibold text-orange-400">Date:</span>{' '}
                          {new Date((appointment as any).date || appointment.appointmentDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })} at {(appointment as any).time || appointment.appointmentTime}
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                          <span className="font-semibold text-orange-400">Reason:</span> {appointment.reason}
                        </p>
                        {appointment.notes && (
                          <p className="text-sm text-gray-300 mt-1">
                            <span className="font-semibold text-orange-400">Notes:</span> {appointment.notes}
                          </p>
                        )}
                      </div>
                      <div className="ml-4">
                        {(appointment.status === 'PENDING' || appointment.status === 'APPROVED') && (
                          <button
                            onClick={() => setCancelModal({ open: true, appointmentId: appointment.id })}
                            className="px-4 py-2 text-sm font-semibold text-red-400 hover:text-red-300 border border-red-500/50 rounded-lg hover:bg-red-500/10 transition-all"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Cancel Confirmation Modal */}
        <ConfirmModal
          isOpen={cancelModal.open}
          onClose={() => setCancelModal({ open: false, appointmentId: null })}
          onConfirm={handleCancelAppointment}
          title="Cancel Appointment"
          message="Are you sure you want to cancel this appointment? This action cannot be undone."
          confirmText="Cancel Appointment"
          variant="danger"
        />
      </div>
    </NotificationProvider>
  );
}
