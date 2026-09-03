import { memo } from 'react';
import { useGameContext } from '../../store/GameContext';
import BoardSquare from '../BoardSquare/BoardSquare';
import './GameBoard.scss';

const GameBoard = memo(() => {
  const { squares } = useGameContext();

  return (
    <div className="game-board" role="grid" aria-label="Tic Tac Toe Board">
      {squares.map((_, index) => (
        <BoardSquare key={index} index={index} />
      ))}
    </div>
  );
});

GameBoard.displayName = 'GameBoard';

export default GameBoard;