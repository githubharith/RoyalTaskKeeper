import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Crown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#1E2A38]">
      {/* Header */}
      <header className="bg-[#965a23] border-b-2 border-royal-gold shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-royal-gold" />
              <h1 className="text-2xl font-bold text-royal-gold">Royal TaskKeeper</h1>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-white font-medium">Welcome, {user.username}</span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 bg-royal-crimson hover:bg-royal-crimson-dark text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;