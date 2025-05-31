import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useChallenge } from '../contexts/ChallengeContext';
import { BarChart3, Calendar, Clock, Edit3, Trophy, Award, ChevronUp, ChevronDown } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const { pastMatches, challenges } = useChallenge();
  const [activeTab, setActiveTab] = useState('stats');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const wins = pastMatches.filter(match => match.playerWon).length;
  const totalMatches = pastMatches.length;
  const winRate = totalMatches > 0 ? Math.round((wins / totalMatches) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 h-32"></div>
        <div className="px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end -mt-12">
            <div className="flex-shrink-0">
              <img 
                className="h-24 w-24 rounded-full ring-4 ring-white bg-white"
                src={user.avatar} 
                alt={user.name} 
              />
            </div>
            <div className="mt-6 sm:mt-0 sm:ml-4 flex-grow">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <button className="btn btn-outline flex items-center">
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit Profile
                </button>
              </div>
              <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
                <span className="mr-4 flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-primary-500" />
                  Rank #{user.rank}
                </span>
                <span className="mr-4 flex items-center">
                  <Award className="h-4 w-4 mr-1 text-primary-500" />
                  {user.points} points
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-primary-500" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stats'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              <BarChart3 className="w-4 h-4 inline-block mr-1" />
              Statistics
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'matches'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('matches')}
            >
              <Trophy className="w-4 h-4 inline-block mr-1" />
              Match History
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'achievements'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('achievements')}
            >
              <Award className="w-4 h-4 inline-block mr-1" />
              Achievements
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'stats' && (
            <div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                        <Trophy className="h-6 w-6 text-primary-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Matches</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{totalMatches}</div>
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
                        <ChevronUp className="h-6 w-6 text-success-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Wins</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{wins}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-error-100 rounded-md p-3">
                        <ChevronDown className="h-6 w-6 text-error-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Losses</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{totalMatches - wins}</div>
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
                        <BarChart3 className="h-6 w-6 text-secondary-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Win Rate</dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">{winRate}%</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Performance by Challenge Type</h3>
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Arrays</span>
                          <span className="text-sm text-gray-500">85%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Strings</span>
                          <span className="text-sm text-gray-500">70%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Dynamic Programming</span>
                          <span className="text-sm text-gray-500">40%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Trees & Graphs</span>
                          <span className="text-sm text-gray-500">60%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Sorting & Searching</span>
                          <span className="text-sm text-gray-500">90%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              {pastMatches.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col\" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Challenge
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Opponent
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Result
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pastMatches.map((match) => {
                        const challenge = challenges.find(c => c.id === match.challengeId);
                        
                        return (
                          <tr key={match.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{challenge?.title || 'Unknown Challenge'}</div>
                              <div className="text-xs text-gray-500">{challenge?.difficulty || 'Unknown'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8">
                                  <img className="h-8 w-8 rounded-full" src={`https://i.pravatar.cc/150?img=${parseInt(match.opponentId.replace('o', ''))}`} alt="" />
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">Opponent #{match.opponentId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${match.playerWon ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'}`}>
                                {match.playerWon ? 'Won' : 'Lost'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(match.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {match.playerWon ? `+${challenge?.points || 100}` : '0'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No matches yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by competing in your first coding duel.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-medium text-center text-gray-900 mb-1">First Victory</h3>
                  <p className="text-sm text-center text-gray-500 mb-3">Win your first coding duel</p>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: wins > 0 ? '100%' : '0%' }}></div>
                  </div>
                  <p className="mt-2 text-xs text-center text-gray-500">{wins > 0 ? 'Completed' : 'Not completed'}</p>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mx-auto mb-4">
                    <Award className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-center text-gray-900 mb-1">Perfect Streak</h3>
                  <p className="text-sm text-center text-gray-500 mb-3">Win 5 duels in a row</p>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="mt-2 text-xs text-center text-gray-500">Not completed (0/5)</p>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mx-auto mb-4">
                    <Clock className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-center text-gray-900 mb-1">Speed Demon</h3>
                  <p className="text-sm text-center text-gray-500 mb-3">Solve a challenge in under 30 seconds</p>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <p className="mt-2 text-xs text-center text-gray-500">In progress</p>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mx-auto mb-4">
                    <Award className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-center text-gray-900 mb-1">Language Master</h3>
                  <p className="text-sm text-center text-gray-500 mb-3">Solve challenges in 3 different languages</p>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                  <p className="mt-2 text-xs text-center text-gray-500">In progress (1/3)</p>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-center text-gray-900 mb-1">Top 100</h3>
                  <p className="text-sm text-center text-gray-500 mb-3">Reach the top 100 on the leaderboard</p>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <p className="mt-2 text-xs text-center text-gray-500">Not completed</p>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                <div className="p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mx-auto mb-4">
                    <Trophy className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-center text-gray-900 mb-1">Challenge Champion</h3>
                  <p className="text-sm text-center text-gray-500 mb-3">Complete all challenges in the library</p>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <p className="mt-2 text-xs text-center text-gray-500">In progress (1/4)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}