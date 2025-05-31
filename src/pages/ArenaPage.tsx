import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useChallenge } from '../contexts/ChallengeContext';
import { mockOpponents } from '../lib/mockApi';
import { Opponent, Challenge } from '../types';
import Editor from '@monaco-editor/react';
import { AlertTriangle, CheckCircle, Clock, Play, Trophy } from 'lucide-react';

export default function ArenaPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { currentGame, startGame, submitSolution, endGame } = useChallenge();
  const [code, setCode] = useState('');
  const [opponent, setOpponent] = useState<Opponent | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [opponentProgress, setOpponentProgress] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<'player' | 'opponent' | null>(null);
  const intervalRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If we don't have a current game, fetch the challenge and start a new game
    if (!currentGame && id) {
      const fetchChallenge = async () => {
        try {
          // In a real app we would fetch the challenge from an API
          // For now, we'll simulate starting with a random opponent
          const randomOpponentId = 'o' + Math.ceil(Math.random() * 4);
          const opponentData = await mockOpponents.getOpponent(randomOpponentId);
          setOpponent(opponentData);
          
          // Start a new game with this challenge and opponent
          startGame(id, opponentData.id);
        } catch (error) {
          console.error('Failed to start game:', error);
          navigate('/dashboard');
        }
      };
      
      fetchChallenge();
    } else if (currentGame) {
      // Set up the challenge and code editor
      setChallenge(currentGame.challenge);
      setCode(currentGame.challenge.initialCode);
      
      // Set up opponent
      const fetchOpponent = async () => {
        try {
          const opponentData = await mockOpponents.getOpponent(currentGame.opponentId);
          setOpponent(opponentData);
        } catch (error) {
          console.error('Failed to fetch opponent:', error);
        }
      };
      
      fetchOpponent();
      
      // Calculate initial time remaining
      const initialTimeRemaining = Math.max(0, Math.floor((currentGame.endTime - Date.now()) / 1000));
      setTimeRemaining(initialTimeRemaining);
      
      // Start the timer
      intervalRef.current = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0) {
            clearInterval(intervalRef.current!);
            handleGameEnd();
            return 0;
          }
          return prev - 1;
        });
        
        // Simulate opponent progress
        setOpponentProgress(prev => {
          const randomIncrement = Math.random() * 5;
          const newProgress = Math.min(100, prev + randomIncrement);
          
          // If opponent completes the challenge
          if (newProgress >= 100 && !hasSubmitted) {
            setWinner('opponent');
            handleGameEnd();
          }
          
          return newProgress;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentGame, id, navigate, startGame, hasSubmitted]);

  const handleSubmit = async () => {
    if (isSubmitting || hasSubmitted) return;
    
    setIsSubmitting(true);
    try {
      // In a real app, we would send the code to be evaluated on the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate code evaluation
      submitSolution(code);
      setHasSubmitted(true);
      setWinner('player');
      handleGameEnd();
    } catch (error) {
      console.error('Failed to submit solution:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGameEnd = () => {
    if (gameOver) return;
    
    setGameOver(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // End the game after a delay to show the result
    setTimeout(() => {
      endGame();
      navigate('/dashboard');
    }, 3000);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!challenge || !opponent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Game Header */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-lg font-medium text-gray-900">
            {challenge.title}
          </div>
          <span 
            className={`ml-2 px-2 py-1 text-xs rounded-full font-medium
              ${challenge.difficulty === 'easy' ? 'bg-success-100 text-success-800' : 
              challenge.difficulty === 'medium' ? 'bg-warning-100 text-warning-800' : 
              'bg-error-100 text-error-800'}`}
          >
            {challenge.difficulty}
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <div className={`flex items-center px-3 py-1 rounded-full ${timeRemaining < 10 ? 'bg-error-50 text-error-700' : 'bg-gray-50'}`}>
            <Clock className="w-4 h-4 mr-1" />
            <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || hasSubmitted || gameOver}
            className="btn btn-primary"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : hasSubmitted ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Submitted
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Run & Submit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-grow grid grid-cols-3 overflow-hidden">
        {/* Problem Statement */}
        <div className="col-span-1 bg-white border-r border-gray-200 overflow-y-auto p-4">
          <h2 className="text-xl font-semibold mb-3">{challenge.title}</h2>
          <div className="prose max-w-none">
            <p className="mb-4">{challenge.description}</p>
            
            <h3 className="text-lg font-medium mt-4 mb-2">Example Test Cases:</h3>
            <div className="space-y-3">
              {challenge.testCases.filter(tc => !tc.isHidden).map((testCase, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-md">
                  <div className="mb-1">
                    <span className="font-medium text-gray-700">Input:</span> <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{testCase.input}</code>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Expected Output:</span> <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{testCase.expectedOutput}</code>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 bg-amber-50 border border-amber-200 p-3 rounded-md">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-800">
                    Note: There are additional hidden test cases that your solution will be tested against.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="col-span-2 flex flex-col h-full">
          <div className="flex-grow overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue={challenge.initialCode}
              theme="vs-dark"
              onChange={value => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                tabSize: 2,
                automaticLayout: true,
                scrollBeyondLastLine: false,
              }}
            />
          </div>
          
          {/* Opponent Progress */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src={opponent.avatar} alt={opponent.name} className="w-6 h-6 rounded-full mr-2" />
                <span className="font-medium text-gray-900">{opponent.name}</span>
              </div>
              <span className="text-sm text-gray-500">Rank #{opponent.rank}</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-secondary-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${opponentProgress}%` }}
              ></div>
            </div>
            <div className="mt-1 text-sm text-gray-500 flex justify-between">
              <span>Progress: {Math.round(opponentProgress)}%</span>
              {hasSubmitted && (
                <span className="text-success-600 font-medium">You've submitted your solution!</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Game Over Overlay */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md text-center">
            <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4">
              {winner === 'player' ? (
                <Trophy className="h-12 w-12 text-warning-500 animate-bounce-slow" />
              ) : (
                <Trophy className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {winner === 'player' ? 'Victory!' : 'Defeat!'}
            </h2>
            <p className="text-gray-600 mb-4">
              {winner === 'player' 
                ? 'Congratulations! You solved the challenge first!' 
                : 'Your opponent was faster this time.'}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="btn btn-primary"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}