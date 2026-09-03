import { createContext, useState, useContext, useCallback, useEffect, useMemo } from 'react';
import type { 
  GameState, 
  Player, 
  Winner, 
  GameMode,
} from '../utils/gameLogic';
import {
  checkWinner,
  isDraw,
  getNextTurn,
  getAIMove,
  createEmptyBoard,
} from '../utils/gameLogic';

interface GameContextType extends GameState {
  difficulty: 'easy' | 'medium' | 'hard';
  updateSquares: (index: number) => void;
  resetGame: () => void;
  undoMove: () => void;
  setMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const STORAGE_KEY = 'tic-tac-toe-state';

const getInitialState = (): GameState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.squares && parsed.turn && parsed.mode) {
        return {
          squares: parsed.squares,
          turn: parsed.turn,
          winner: parsed.winner,
          mode: parsed.mode,
          scores: parsed.scores || { x: 0, o: 0 },
          draws: parsed.draws || 0,
          history: parsed.history || [],
        };
      }
    }
  } catch {
    // Ignore parse errors
  }
  return {
    squares: createEmptyBoard(),
    turn: 'x',
    winner: null,
    mode: 'pvp',
    scores: { x: 0, o: 0 },
    draws: 0,
    history: [],
  };
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GameState>(getInitialState);
  const [difficulty, setDifficultyState] = useState<'easy' | 'medium' | 'hard'>('hard');
  const [aiPlayer] = useState<Player>('o');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  const addToHistory = useCallback((newState: GameState) => {
    setState((prev) => ({
      ...newState,
      history: [
        ...prev.history,
        {
          squares: newState.squares,
          turn: newState.turn,
          winner: newState.winner,
          moveIndex: prev.history.length,
        },
      ],
    }));
  }, []);

  const updateSquares = useCallback((index: number) => {
    setState((prev) => {
      if (prev.squares[index] || prev.winner) {
        return prev;
      }

      const newSquares = [...prev.squares];
      newSquares[index] = prev.turn;

      const winner = checkWinner(newSquares);
      const draw = isDraw(newSquares, winner);
      const nextTurn = getNextTurn(prev.turn);

      const newState: GameState = {
        ...prev,
        squares: newSquares,
        turn: draw || winner ? prev.turn : nextTurn,
        winner: winner || (draw ? 'draw' : null),
        scores: winner && winner !== 'draw'
          ? { ...prev.scores, [winner]: prev.scores[winner] + 1 }
          : prev.scores,
        draws: draw ? prev.draws + 1 : prev.draws,
      };

      addToHistory(newState);
      return newState;
    });
  }, [addToHistory]);

  const handleAIMove = useCallback(() => {
    setState((prev) => {
      if (prev.winner || prev.mode !== 'pvai' || prev.turn !== aiPlayer) {
        return prev;
      }

      const moveIndex = getAIMove(prev.squares, aiPlayer, prev.turn === 'x' ? 'o' : 'x', difficulty);
      
      if (moveIndex === -1) return prev;

      const newSquares = [...prev.squares];
      newSquares[moveIndex] = aiPlayer;

      const winner = checkWinner(newSquares);
      const draw = isDraw(newSquares, winner);
      const nextTurn = getNextTurn(aiPlayer);

      const newState: GameState = {
        ...prev,
        squares: newSquares,
        turn: draw || winner ? aiPlayer : nextTurn,
        winner: winner || (draw ? 'draw' : null),
        scores: winner && winner !== 'draw'
          ? { ...prev.scores, [winner]: prev.scores[winner] + 1 }
          : prev.scores,
        draws: draw ? prev.draws + 1 : prev.draws,
      };

      addToHistory(newState);
      return newState;
    });
  }, [aiPlayer, difficulty, addToHistory]);

  useEffect(() => {
    if (state.mode === 'pvai' && state.turn === aiPlayer && !state.winner) {
      const timer = setTimeout(handleAIMove, 500);
      return () => clearTimeout(timer);
    }
  }, [state.mode, state.turn, state.winner, aiPlayer, handleAIMove]);

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      squares: createEmptyBoard(),
      turn: 'x',
      winner: null,
      history: [],
    }));
  }, []);

  const undoMove = useCallback(() => {
    setState((prev) => {
      if (prev.history.length === 0) return prev;
      
      const newHistory = [...prev.history];
      newHistory.pop();
      
      const lastState = newHistory.length > 0 
        ? newHistory[newHistory.length - 1]
        : { squares: createEmptyBoard(), turn: 'x' as Player, winner: null as Winner };

      return {
        ...prev,
        squares: lastState.squares,
        turn: lastState.turn,
        winner: lastState.winner,
        history: newHistory,
      };
    });
  }, []);

  const setMode = useCallback((mode: GameMode) => {
    setState((prev) => ({
      ...prev,
      mode,
      squares: createEmptyBoard(),
      turn: 'x',
      winner: null,
      history: [],
    }));
  }, []);

  const setDifficulty = useCallback((newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficultyState(newDifficulty);
  }, []);

  const contextValue = useMemo(() => ({
    ...state,
    difficulty,
    updateSquares,
    resetGame,
    undoMove,
    setMode,
    setDifficulty,
  }), [state, difficulty, updateSquares, resetGame, undoMove, setMode, setDifficulty]);

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};