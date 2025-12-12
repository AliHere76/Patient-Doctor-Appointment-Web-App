'use client';

import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import NotificationBell from './NotificationBell';

interface NavbarProps {
  userEmail: string;
  userRole: string;
}

export default function Navbar({ userEmail, userRole }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await authAPI.logout();
    router.push('/login');
  };

  const getDashboardLinks = () => {
    switch (userRole) {
      case 'ADMIN':
        return [
          { name: 'Dashboard', href: '/admin/dashboard' },
          { name: 'Users', href: '/admin/users' },
          { name: 'Appointments', href: '/admin/appointments' },
        ];
      case 'DOCTOR':
        return [
          { name: 'Dashboard', href: '/doctor/dashboard' },
          { name: 'Appointments', href: '/doctor/appointments' },
        ];
      case 'PATIENT':
        return [
          { name: 'Dashboard', href: '/patient/dashboard' },
          { name: 'Book', href: '/patient/book-appointment' },
          { name: 'Appointments', href: '/patient/appointments' },
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <span className="text-lg font-black bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text">
                HealthHub
              </span>
            </div>
            <div className="hidden md:flex md:gap-1">
              {getDashboardLinks().map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-orange-400 hover:bg-gray-800/50 rounded-lg transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="flex items-center gap-3 pl-4 border-l border-gray-800/50">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{userEmail}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{userRole}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-all hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
