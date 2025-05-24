
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  moodEmoji: string;
  journalEntry: string;
  recommendations?: {
    bts: { song: string; lyrics: string; message: string };
    marvel: { quote: string; character: string; message: string };
    disney: { movie: string; quote: string; message: string };
  };
  moodboardId?: string;
}

export interface Moodboard {
  id: string;
  title: string;
  mood: string;
  createdBy: string;
  isPublic: boolean;
  likes: number;
  createdAt: string;
  elements: any[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  fandoms: string[];
  isPrivate: boolean;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: MoodEntry) => void;
  moodboards: Moodboard[];
  addMoodboard: (moodboard: Moodboard) => void;
  updateMoodboard: (id: string, updates: Partial<Moodboard>) => void;
  publicMoodboards: Moodboard[];
  addPublicMoodboard: (moodboard: Moodboard) => void;
  likeMoodboard: (id: string) => void;
  isAuthenticated: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [moodboards, setMoodboards] = useState<Moodboard[]>([]);
  const [publicMoodboards, setPublicMoodboards] = useState<Moodboard[]>([
    {
      id: '1',
      title: 'BTS Purple Aesthetic',
      mood: '💜',
      createdBy: 'ARMY_Luna',
      isPublic: true,
      likes: 234,
      createdAt: '2024-01-15',
      elements: []
    },
    {
      id: '2',
      title: 'Marvel Hero Energy',
      mood: '⚡',
      createdBy: 'MarvelFan23',
      isPublic: true,
      likes: 189,
      createdAt: '2024-01-14',
      elements: []
    },
    {
      id: '3',
      title: 'Disney Princess Dreams',
      mood: '🏰',
      createdBy: 'DisneyMagic',
      isPublic: true,
      likes: 312,
      createdAt: '2024-01-13',
      elements: []
    }
  ]);

  const addMoodEntry = (entry: MoodEntry) => {
    setMoodEntries(prev => [...prev, entry]);
  };

  const addMoodboard = (moodboard: Moodboard) => {
    setMoodboards(prev => [...prev, moodboard]);
    if (moodboard.isPublic) {
      setPublicMoodboards(prev => [...prev, moodboard]);
    }
  };

  const updateMoodboard = (id: string, updates: Partial<Moodboard>) => {
    setMoodboards(prev => prev.map(mb => mb.id === id ? { ...mb, ...updates } : mb));
    if (updates.isPublic) {
      const moodboard = moodboards.find(mb => mb.id === id);
      if (moodboard) {
        setPublicMoodboards(prev => [...prev, { ...moodboard, ...updates }]);
      }
    }
  };

  const addPublicMoodboard = (moodboard: Moodboard) => {
    setPublicMoodboards(prev => [...prev, moodboard]);
  };

  const likeMoodboard = (id: string) => {
    setPublicMoodboards(prev => prev.map(mb => 
      mb.id === id ? { ...mb, likes: mb.likes + 1 } : mb
    ));
  };

  const isAuthenticated = user !== null;

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      moodEntries,
      addMoodEntry,
      moodboards,
      addMoodboard,
      updateMoodboard,
      publicMoodboards,
      addPublicMoodboard,
      likeMoodboard,
      isAuthenticated
    }}>
      {children}
    </AppContext.Provider>
  );
};
