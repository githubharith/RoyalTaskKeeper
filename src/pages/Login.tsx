import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Crown, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const { user, login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#1E2A38] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center animate-fade-in">
          <Crown className="mx-auto h-16 w-16 text-royal-gold animate-bounce-subtle" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">Royal TaskKeeper</h2>
          <p className="mt-2 text-sm text-royal-brown-light">Sign in to your royal account</p>
        </div>
        
        <form className="mt-8 space-y-6 animate-slide-up" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-royal-gold" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-3 py-3 border border-royal-gold bg-[#5E3A3A] text-white placeholder-royal-brown-light
                   rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-all duration-200"
                  placeholder="Email address"
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-royal-gold" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 w-full px-3 py-3 border border-royal-gold bg-[#5E3A3A] text-white placeholder-royal-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-all duration-200"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-royal-gold hover:text-royal-gold-light transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-royal-crimson text-sm text-center bg-royal-crimson-dark bg-opacity-20 py-2 px-3 rounded-lg border border-royal-crimson">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-royal-brown bg-royal-gold hover:bg-royal-gold-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-gold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-royal-brown"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-royal-brown-light">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-medium text-royal-gold hover:text-royal-gold-light transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;