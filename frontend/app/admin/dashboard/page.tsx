'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { NotificationProvider } from '@/components/NotificationProvider';
import { authAPI, appointmentAPI } from '@/lib/api';
import { User, Appointment } from '@/lib/types';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const profileRes = await authAPI.getProfile();
      if (profileRes.success && profileRes.data?.user) {
        setUser(profileRes.data.user);
      } else {
        router.push('/login');
        return;
      }

      const usersRes = await authAPI.getAllUsers();
      if (usersRes.success && usersRes.data) {
        const allUsers = usersRes.data.users;
        setUsers(allUsers);
        setStats({
          totalUsers: allUsers.length,
          totalPatients: allUsers.filter((u) => u.role === 'PATIENT').length,
          totalDoctors: allUsers.filter((u) => u.role === 'DOCTOR').length,
          totalAppointments: 0,
        });
      }

      const appointmentsRes = await appointmentAPI.getAllAppointments();
      if (appointmentsRes.success && appointmentsRes.data) {
        const allAppointments = appointmentsRes.data.appointments;
        setAppointments(allAppointments);
        setStats((prev) => ({ ...prev, totalAppointments: allAppointments.length }));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
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
            <h1 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">System overview and management</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-orange-500/50 transition-all">
              <h3 className="text-sm font-semibold text-gray-400">Total Users</h3>
              <p className="text-3xl font-black text-white mt-2">{stats.totalUsers}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <h3 className="text-sm font-semibold text-gray-400">Patients</h3>
              <p className="text-3xl font-black text-blue-500 mt-2">{stats.totalPatients}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <h3 className="text-sm font-semibold text-gray-400">Doctors</h3>
              <p className="text-3xl font-black text-green-500 mt-2">{stats.totalDoctors}</p>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-amber-500/50 transition-all">
              <h3 className="text-sm font-semibold text-gray-400">Total Appointments</h3>
              <p className="text-3xl font-black text-amber-500 mt-2">{stats.totalAppointments}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => router.push('/admin/users')}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105"
              >
                Manage Users
              </button>
              <button
                onClick={() => router.push('/admin/appointments')}
                className="px-6 py-3 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-all"
              >
                View All Appointments
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">Recent Users</h2>
              </div>
              <div className="divide-y divide-gray-800">
                {users.slice(0, 5).map((usr) => (
                  <div key={usr.id} className="p-4 hover:bg-gray-800/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{usr.email}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">{usr.role}</p>
                        {usr.specialization && (
                          <p className="text-xs text-orange-400 font-medium">{usr.specialization}</p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(usr.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">Recent Appointments</h2>
              </div>
              <div className="divide-y divide-gray-800">
                {appointments.slice(0, 5).map((apt) => (
                  <div key={apt.id} className="p-4 hover:bg-gray-800/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {(apt as any).patientName || apt.patientEmail || 'Unknown'} → Dr. {(apt as any).doctorName || apt.doctorEmail || 'Unknown'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date((apt as any).date || apt.appointmentDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })} at {(apt as any).time || apt.appointmentTime}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          apt.status === 'PENDING'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : apt.status === 'APPROVED'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : apt.status === 'COMPLETED'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : apt.status === 'REJECTED'
                            ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
}
