import { User, Challenge, Opponent } from '../types';

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    points: 1250,
    rank: 23,
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2023-01-15T00:00:00.000Z',
    stats: {
      wins: 27,
      losses: 14,
      challenges: 41,
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    points: 980,
    rank: 45,
    avatar: 'https://i.pravatar.cc/150?img=5',
    createdAt: '2023-02-20T00:00:00.000Z',
    stats: {
      wins: 18,
      losses: 22,
      challenges: 40,
    },
  },
];

// Mock challenges
const mockChallengeList: Challenge[] = [
  {
    id: 'c1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    category: 'arrays',
    initialCode: 'function twoSum(nums, target) {\n  // Your code here\n}',
    testCases: [
      {
        input: '[2, 7, 11, 15], 9',
        expectedOutput: '[0, 1]',
        isHidden: false,
      },
      {
        input: '[3, 2, 4], 6',
        expectedOutput: '[1, 2]',
        isHidden: false,
      },
      {
        input: '[3, 3], 6',
        expectedOutput: '[0, 1]',
        isHidden: true,
      },
    ],
    timeLimit: 60,
    points: 100,
  },
  {
    id: 'c2',
    title: 'Valid Palindrome',
    description: 'Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
    difficulty: 'easy',
    category: 'strings',
    initialCode: 'function isPalindrome(s) {\n  // Your code here\n}',
    testCases: [
      {
        input: '"A man, a plan, a canal: Panama"',
        expectedOutput: 'true',
        isHidden: false,
      },
      {
        input: '"race a car"',
        expectedOutput: 'false',
        isHidden: false,
      },
      {
        input: '" "',
        expectedOutput: 'true',
        isHidden: true,
      },
    ],
    timeLimit: 60,
    points: 100,
  },
  {
    id: 'c3',
    title: 'Merge Intervals',
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    difficulty: 'medium',
    category: 'arrays',
    initialCode: 'function merge(intervals) {\n  // Your code here\n}',
    testCases: [
      {
        input: '[[1,3],[2,6],[8,10],[15,18]]',
        expectedOutput: '[[1,6],[8,10],[15,18]]',
        isHidden: false,
      },
      {
        input: '[[1,4],[4,5]]',
        expectedOutput: '[[1,5]]',
        isHidden: false,
      },
    ],
    timeLimit: 60,
    points: 200,
  },
  {
    id: 'c4',
    title: 'LRU Cache',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.',
    difficulty: 'hard',
    category: 'design',
    initialCode: 'class LRUCache {\n  constructor(capacity) {\n    // Initialize your data structure here\n  }\n\n  get(key) {\n    // Return the value of the key if it exists, otherwise return -1\n  }\n\n  put(key, value) {\n    // Update the value of the key if present, or insert the key if not\n    // When the cache reaches its capacity, invalidate the least recently used item\n  }\n}',
    testCases: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        expectedOutput: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        isHidden: false,
      },
    ],
    timeLimit: 60,
    points: 300,
  },
];

// Mock opponents (for matchmaking)
const mockOpponentList: Opponent[] = [
  {
    id: 'o1',
    name: 'Alex Johnson',
    rank: 18,
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 'o2',
    name: 'Sam Wilson',
    rank: 32,
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 'o3',
    name: 'Taylor Swift',
    rank: 5,
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 'o4',
    name: 'Morgan Freeman',
    rank: 67,
    avatar: 'https://i.pravatar.cc/150?img=14',
  },
];

// Mock API functions
export const mockAuth = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    return user;
  },
  
  register: async (name: string, email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      points: 0,
      rank: mockUsers.length + 1,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      createdAt: new Date().toISOString(),
      stats: {
        wins: 0,
        losses: 0,
        challenges: 0,
      },
    };
    
    // In a real app, we would save this user to a database
    mockUsers.push(newUser);
    
    return newUser;
  },
};

export const mockChallenges = {
  getChallenges: async (): Promise<Challenge[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockChallengeList;
  },
  
  getChallenge: async (id: string): Promise<Challenge> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const challenge = mockChallengeList.find(c => c.id === id);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    
    return challenge;
  },
};

export const mockOpponents = {
  getOpponents: async (): Promise<Opponent[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockOpponentList;
  },
  
  getOpponent: async (id: string): Promise<Opponent> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const opponent = mockOpponentList.find(o => o.id === id);
    if (!opponent) {
      throw new Error('Opponent not found');
    }
    
    return opponent;
  },
};