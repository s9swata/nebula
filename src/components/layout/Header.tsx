import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Code, Trophy, User, Home, LogOut } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Code className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CodeDuel</span>
            </Link>
            <nav className="ml-10 flex items-center space-x-4">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-primary-600 hover:bg-gray-50"
              >
                <Home className="inline-block w-4 h-4 mr-1" />
                Home
              </Link>
              {user && (
                <Link 
                  to="/dashboard" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-primary-600 hover:bg-gray-50"
                >
                  <Trophy className="inline-block w-4 h-4 mr-1" />
                  Challenges
                </Link>
              )}
            </nav>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-success-500 ring-2 ring-white"></span>
                  </div>
                  <div className="ml-2">
                    <span className="block">{user.name}</span>
                    <span className="block text-xs text-gray-500">
                      {user.points} pts • Rank #{user.rank}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="btn btn-outline"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}