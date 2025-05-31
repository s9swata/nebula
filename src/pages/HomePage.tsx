import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Code, Zap, Trophy, Users, Brain } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Code Faster.</span>
            <span className="block text-primary-600">Win Bigger.</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Challenge others to real-time coding duels. Solve problems faster than your opponent and climb the ranks.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            {user ? (
              <Link
                to="/dashboard"
                className="btn btn-primary py-3 px-8 text-base"
              >
                Enter Dashboard
              </Link>
            ) : (
              <>
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="btn btn-primary py-3 px-8 text-base"
                  >
                    Get Started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/login"
                    className="btn btn-outline py-3 px-8 text-base"
                  >
                    Log In
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Illustration */}
        <div className="mt-12 max-w-lg mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-6 flex items-center justify-between bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm font-medium text-gray-500">CodeDuel Battle - 1:00</div>
              <div className="w-20"></div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-2">Your Code</div>
                <pre className="text-xs font-mono bg-gray-50 p-2 rounded">
                  <code className="text-gray-800">
{`function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
}`}
                  </code>
                </pre>
                <div className="mt-2 bg-success-50 text-success-700 text-xs px-2 py-1 rounded">
                  ✓ All tests passed!
                </div>
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 mb-2">Opponent's Progress</div>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary-500 rounded-full w-1/2 animate-pulse-slow"></div>
                </div>
                <div className="mt-4 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Test Cases:</span>
                    <span>1/3 passed</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Time Remaining:</span>
                    <span className="text-error-600 font-medium">32s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How CodeDuel Works</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Compete in 1v1 coding battles to improve your skills and climb the ranks
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 mx-auto bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Find an Opponent</h3>
            <p className="mt-2 text-gray-600">
              Get matched with a coder of similar skill level in seconds
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 mx-auto bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Solve the Challenge</h3>
            <p className="mt-2 text-gray-600">
              Both players receive the same coding problem to solve
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 mx-auto bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Race the Clock</h3>
            <p className="mt-2 text-gray-600">
              Complete the challenge correctly before your opponent and time runs out
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 mx-auto bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Earn Points & Rank Up</h3>
            <p className="mt-2 text-gray-600">
              Win battles to gain points and climb the global leaderboard
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-primary-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 lg:px-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">Ready to test your skills?</h2>
              <p className="mt-4 text-lg text-primary-100 max-w-3xl mx-auto">
                Join thousands of coders already dueling on our platform. Improve your coding speed and problem-solving abilities while having fun!
              </p>
              <div className="mt-8">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="btn bg-white text-primary-700 hover:bg-gray-100 py-3 px-8 text-base font-medium"
                  >
                    Start Dueling Now
                  </Link>
                ) : (
                  <Link
                    to="/register"
                    className="btn bg-white text-primary-700 hover:bg-gray-100 py-3 px-8 text-base font-medium"
                  >
                    Create Free Account
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}