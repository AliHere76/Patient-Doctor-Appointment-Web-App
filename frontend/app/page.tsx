import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated background gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-orange-500/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur opacity-75"></div>
                <div className="relative w-11 h-11 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center transform hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-orange-400 to-amber-500 text-transparent bg-clip-text">
                  HealthHub
                </h1>
                <p className="text-xs text-gray-500">Appointment System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="px-6 py-2.5 text-gray-300 hover:text-orange-400 font-medium transition-colors">
                Login
              </Link>
              <Link href="/register" className="group relative px-6 py-2.5 font-medium text-white overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 transition-transform group-hover:scale-105"></div>
                <span className="relative">Get Started</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-32 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                <span className="text-sm text-orange-400 font-medium">Live Scheduling Available</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black leading-tight">
                <span className="block text-white">Your Health,</span>
                <span className="block bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 text-transparent bg-clip-text animate-gradient">
                  Our Priority
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                Experience seamless healthcare management with instant appointment booking, real-time updates, and secure access to your medical schedule.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="group relative px-8 py-4 font-semibold text-white overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center gap-2">
                    Book Appointment
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link href="/login" className="px-8 py-4 font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-gray-700 rounded-xl transition-all">
                  Sign In
                </Link>
              </div>
            </div>

            {/* Floating Card Animation */}
            <div className="relative hidden lg:block">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded-3xl blur-2xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border border-orange-500/20 rounded-3xl p-8 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Registered Users</p>
                      <p className="text-2xl font-bold text-white">2,847+</p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Appointments Today</p>
                      <p className="text-2xl font-bold text-white">156</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-orange-500/50 rounded-2xl p-8 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Instant Booking</h3>
                <p className="text-gray-400">Book appointments in seconds with real-time availability checking.</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-orange-500/50 rounded-2xl p-8 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Smart Alerts</h3>
                <p className="text-gray-400">Get notified instantly about appointment updates and reminders.</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-orange-500/50 rounded-2xl p-8 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Secure Platform</h3>
                <p className="text-gray-400">Your health data is protected with enterprise-grade security.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-orange-500/10 bg-black/40 backdrop-blur-xl py-8">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gray-500">© 2025 HealthHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}