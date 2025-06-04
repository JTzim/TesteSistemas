import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, ClipboardList, FileSpreadsheet, BarChart2, Users, LogOut, Menu, X, BookOpen } from 'lucide-react';

const Layout: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/projects', name: 'Projects', icon: <BookOpen size={20} /> },
    { path: '/test-cases', name: 'Test Cases', icon: <ClipboardList size={20} /> },
    { path: '/test-plans', name: 'Test Plans', icon: <FileSpreadsheet size={20} /> },
    { path: '/reports', name: 'Reports', icon: <BarChart2 size={20} /> },
  ];

  if (isAdmin) {
    menuItems.push({ path: '/users', name: 'Users', icon: <Users size={20} /> });
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <button
        className="lg:hidden fixed z-20 bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-10
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-auto
        w-64 bg-slate-800 text-white p-4
      `}>
        <div className="flex items-center justify-between mb-10 pr-2">
          <div className="flex items-center">
            <ClipboardList className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-xl font-bold">TestFlow</span>
          </div>
          <button 
            className="lg:hidden text-gray-300 hover:text-white" 
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-4 py-2 rounded-lg transition duration-200
                    ${location.pathname === item.path 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-slate-700'}
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4">
          <div className="flex items-center mb-4 px-4">
            <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center text-white font-semibold">
              {user?.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16">
          <div className="px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-medium text-gray-900">{
              menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'
            }</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;