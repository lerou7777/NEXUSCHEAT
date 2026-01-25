import { useState, useEffect, useCallback } from 'react';

const CREDITS_KEY = 'cyber_credits';
const USED_KEY = 'cyber_used_actions';

interface UseCreditsReturn {
  credits: number;
  hasUsedFreeAction: boolean;
  useCredits: (amount: number, actionId: string) => boolean;
  addCredits: (amount: number) => void;
  markActionUsed: (actionId: string) => void;
  isActionUsed: (actionId: string) => boolean;
  resetCredits: () => void;
}

export function useCredits(): UseCreditsReturn {
  const [credits, setCredits] = useState<number>(() => {
    const stored = localStorage.getItem(CREDITS_KEY);
    return stored !== null ? parseInt(stored, 10) : 10;
  });

  const [usedActions, setUsedActions] = useState<Set<string>>(() => {
    const stored = localStorage.getItem(USED_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const hasUsedFreeAction = usedActions.size > 0;

  useEffect(() => {
    localStorage.setItem(CREDITS_KEY, credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem(USED_KEY, JSON.stringify([...usedActions]));
  }, [usedActions]);

  const markActionUsed = useCallback((actionId: string) => {
    setUsedActions(prev => {
      const next = new Set(prev);
      next.add(actionId);
      return next;
    });
  }, []);

  const isActionUsed = useCallback((actionId: string) => {
    return usedActions.has(actionId);
  }, [usedActions]);

  const useCredits = useCallback((amount: number, actionId: string): boolean => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      markActionUsed(actionId);
      return true;
    }
    return false;
  }, [credits, markActionUsed]);

  const addCredits = useCallback((amount: number) => {
    setCredits(prev => prev + amount);
  }, []);

  const resetCredits = useCallback(() => {
    setCredits(10);
    setUsedActions(new Set());
  }, []);

  return {
    credits,
    hasUsedFreeAction,
    useCredits,
    addCredits,
    markActionUsed,
    isActionUsed,
    resetCredits,
  };
}
