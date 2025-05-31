import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChallenge } from '../contexts/ChallengeContext';
import { mockOpponents } from '../lib/mockApi';
import { Opponent } from '../types';
import { Trophy, Clock, BookOpen, ChevronRight, Users, Star } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { challenges, pastMatches, loading, startGame } = useChallenge();
  const [opponents, setOpponents] = useState<Opponent[]>([]);
  const [selectedOpponent, setSelectedOpponent] = useState<Opponent | null>(null);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [loadingOpponents, setLoadingOpponents] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOpponents = async () => {
      try {
        const data = await mockOpponents.getOpponents();
        setOpponents(data);
      } catch (error) {
        console.error('Failed to fetch opponents:', error);
      } finally {
        setLoadingOpponents(false);
      }
    };

    fetchOpponents();
  }, []);

  const handleStartGame = () => {
    if (selectedOpponent && selectedChallengeId) {
      startGame(selectedChallengeId, selectedOpponent.id);
      navigate(`/arena/${selectedChallengeId}`);
    }
  };

  if (loading || loadingOpponents) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Your current rank: <span className="font-medium text-primary-600">#{user?.rank}</span> with <span className="font-medium text-primary-600">{user?.points} points</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <button 
              onClick={() => navigate('/profile')}
              className="btn btn-outline"
            >
              View Profile
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => document.getElementById('start-duel-modal')?.classList.remove('hidden')}
            >
              Start New Duel
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                <Trophy className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Wins</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{user?.stats.wins}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-secondary-100 rounded-md p-3">
                <BookOpen className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Challenges Completed</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{user?.stats.challenges}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-accent-100 rounded-md p-3">
                <Clock className="h-6 w-6 text-accent-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg. Completion Time</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">38s</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-success-100 rounded-md p-3">
                <Users className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Current Streak</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">3 wins</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Matches</h2>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {pastMatches.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col\" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opponent
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Challenge
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Result
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pastMatches.slice(0, 5).map((match) => {
                    const challenge = challenges.find(c => c.id === match.challengeId);
                    const opponent = opponents.find(o => o.id === match.opponentId);
                    
                    return (
                      <tr key={match.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={opponent?.avatar || 'https://i.pravatar.cc/150?img=20'} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{opponent?.name || 'Unknown Opponent'}</div>
                              <div className="text-sm text-gray-500">Rank #{opponent?.rank || '??'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{challenge?.title || 'Unknown Challenge'}</div>
                          <div className="text-sm text-gray-500">{challenge?.difficulty || 'Unknown'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${match.playerWon ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'}`}>
                            {match.playerWon ? 'Won' : 'Lost'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(match.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.playerScore} - {match.opponentScore}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No matches played yet.</p>
              <button
                onClick={() => document.getElementById('start-duel-modal')?.classList.remove('hidden')}
                className="mt-4 btn btn-primary"
              >
                Start Your First Duel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Available Challenges */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Available Challenges</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                  <span 
                    className={`px-2 py-1 text-xs rounded-full font-medium
                      ${challenge.difficulty === 'easy' ? 'bg-success-100 text-success-800' : 
                      challenge.difficulty === 'medium' ? 'bg-warning-100 text-warning-800' : 
                      'bg-error-100 text-error-800'}`}
                  >
                    {challenge.difficulty}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Star className="flex-shrink-0 mr-1.5 h-4 w-4 text-warning-500" />
                  <span>{challenge.points} points</span>
                </div>
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{challenge.description}</p>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      setSelectedChallengeId(challenge.id);
                      document.getElementById('start-duel-modal')?.classList.remove('hidden');
                    }}
                    className="btn btn-outline w-full"
                  >
                    Start Duel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Duel Modal */}
      <div id="start-duel-modal" className="fixed inset-0 overflow-y-auto hidden" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Start a New Duel
                  </h3>
                  <div className="mt-4">
                    <label htmlFor="challenge" className="block text-sm font-medium text-gray-700">Select Challenge</label>
                    <select
                      id="challenge"
                      name="challenge"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      value={selectedChallengeId || ''}
                      onChange={(e) => setSelectedChallengeId(e.target.value)}
                    >
                      <option value="">Select a challenge</option>
                      {challenges.map((challenge) => (
                        <option key={challenge.id} value={challenge.id}>
                          {challenge.title} ({challenge.difficulty})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="opponent" className="block text-sm font-medium text-gray-700">Select Opponent</label>
                    <select
                      id="opponent"
                      name="opponent"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      value={selectedOpponent?.id || ''}
                      onChange={(e) => {
                        const opponent = opponents.find(o => o.id === e.target.value);
                        setSelectedOpponent(opponent || null);
                      }}
                    >
                      <option value="">Select an opponent</option>
                      {opponents.map((opponent) => (
                        <option key={opponent.id} value={opponent.id}>
                          {opponent.name} (Rank #{opponent.rank})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                disabled={!selectedChallengeId || !selectedOpponent}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                onClick={handleStartGame}
              >
                Start Duel
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => document.getElementById('start-duel-modal')?.classList.add('hidden')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}