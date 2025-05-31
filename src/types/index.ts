export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  rank: number;
  avatar: string;
  createdAt: string;
  stats: {
    wins: number;
    losses: number;
    challenges: number;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  initialCode: string;
  testCases: TestCase[];
  timeLimit: number; // in seconds
  points: number;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface GameState {
  challengeId: string;
  opponentId: string;
  challenge: Challenge;
  startTime: number;
  endTime: number;
  playerSolved: boolean;
  opponentProgress: number; // 0-100 percentage
  winner: 'player' | 'opponent' | null;
}

export interface MatchResult {
  id: string;
  challengeId: string;
  opponentId: string;
  date: string;
  playerWon: boolean;
  playerScore: number;
  opponentScore: number;
}

export interface Opponent {
  id: string;
  name: string;
  rank: number;
  avatar: string;
}