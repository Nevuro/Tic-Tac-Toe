export type Player = 'x' | 'o';
export type SquareValue = Player | '';
export type Winner = Player | 'draw' | null;
export type GameMode = 'pvp' | 'pvai';

export const INITIAL_GAME_BOARD: SquareValue[] = Array(9).fill('');

export const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export interface GameState {
  squares: SquareValue[];
  turn: Player;
  winner: Winner;
  mode: GameMode;
  scores: Record<Player, number>;
  draws: number;
  history: HistoryEntry[];
}

export interface HistoryEntry {
  squares: SquareValue[];
  turn: Player;
  winner: Winner;
  moveIndex: number;
}

export const checkWinner = (squares: SquareValue[]): Winner => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    const value = squares[a];
    if (value && value === squares[b] && value === squares[c]) {
      return value;
    }
  }
  return null;
};

export const isGameEnded = (squares: SquareValue[]): boolean => {
  return squares.every((square) => square !== '');
};

export const isDraw = (squares: SquareValue[], winner: Winner): boolean => {
  return winner === null && isGameEnded(squares);
};

export const getNextTurn = (turn: Player): Player => {
  return turn === 'x' ? 'o' : 'x';
};

export const createEmptyBoard = (): SquareValue[] => {
  return [...INITIAL_GAME_BOARD];
};

export const minimax = (
  board: SquareValue[],
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  humanPlayer: Player
): number => {
  const winner = checkWinner(board);
  
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (isGameEnded(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = aiPlayer;
        const score = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = humanPlayer;
        const score = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export const getBestMove = (board: SquareValue[], aiPlayer: Player, humanPlayer: Player): number => {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = aiPlayer;
      const score = minimax(board, 0, false, aiPlayer, humanPlayer);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};

export const getRandomMove = (board: SquareValue[]): number => {
  const emptyIndices = board
    .map((value, index) => (value === '' ? index : -1))
    .filter((index) => index !== -1);
  
  if (emptyIndices.length === 0) return -1;
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};

export const getAIMove = (
  board: SquareValue[], 
  aiPlayer: Player, 
  humanPlayer: Player, 
  difficulty: 'easy' | 'medium' | 'hard'
): number => {
  switch (difficulty) {
    case 'easy':
      return getRandomMove(board);
    case 'medium':
      return Math.random() < 0.5 
        ? getBestMove(board, aiPlayer, humanPlayer)
        : getRandomMove(board);
    case 'hard':
    default:
      return getBestMove(board, aiPlayer, humanPlayer);
  }
};