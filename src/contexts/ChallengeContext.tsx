import React, { createContext, useContext, useState, useEffect } from 'react';
import { Challenge, GameState, MatchResult } from '../types';
import { mockChallenges } from '../lib/mockApi';

interface ChallengeContextType {
  challenges: Challenge[];
  currentGame: GameState | null;
  pastMatches: MatchResult[];
  loading: boolean;
  startGame: (challengeId: string, opponentId: string) => void;
  submitSolution: (code: string) => void;
  endGame: () => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export function useChallenge() {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
}

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [currentGame, setCurrentGame] = useState<GameState | null>(null);
  const [pastMatches, setPastMatches] = useState<MatchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await mockChallenges.getChallenges();
        setChallenges(data);
      } catch (error) {
        console.error('Failed to fetch challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
    
    // Load past matches from localStorage
    const storedMatches = localStorage.getItem('codeduel_matches');
    if (storedMatches) {
      setPastMatches(JSON.parse(storedMatches));
    }
  }, []);

  const startGame = (challengeId: string, opponentId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    // Simulating real-time game setup
    setCurrentGame({
      challengeId,
      opponentId,
      challenge,
      startTime: Date.now(),
      endTime: Date.now() + 60000, // 1 minute game
      playerSolved: false,
      opponentProgress: 0,
      winner: null,
    });
  };

  const submitSolution = (code: string) => {
    if (!currentGame) return;

    // In a real app, we would verify the solution server-side
    // For now, we'll simulate a successful submission
    setCurrentGame(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        playerSolved: true,
      };
    });
  };

  const endGame = () => {
    if (!currentGame) return;

    // Determine winner and save match result
    const result: MatchResult = {
      id: `match-${Date.now()}`,
      challengeId: currentGame.challengeId,
      opponentId: currentGame.opponentId,
      date: new Date().toISOString(),
      playerWon: currentGame.playerSolved && (!currentGame.winner || currentGame.winner === 'player'),
      playerScore: currentGame.playerSolved ? 1 : 0,
      opponentScore: currentGame.opponentProgress === 100 ? 1 : 0,
    };

    const updatedMatches = [...pastMatches, result];
    setPastMatches(updatedMatches);
    localStorage.setItem('codeduel_matches', JSON.stringify(updatedMatches));
    setCurrentGame(null);
  };

  return (
    <ChallengeContext.Provider 
      value={{ 
        challenges, 
        currentGame, 
        pastMatches, 
        loading, 
        startGame, 
        submitSolution, 
        endGame 
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}