import { memo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameContext } from '../../store/GameContext';
import './BoardSquare.scss';

interface BoardSquareProps {
  index: number;
  isStatic?: boolean;
  clsName?: 'x' | 'o';
}

const BoardSquare = memo(({ index, isStatic = false, clsName }: BoardSquareProps) => {
  const { squares, winner, updateSquares } = useGameContext();
  const value = isStatic ? clsName : squares[index];
  
  const isWinningSquare = !winner || winner === 'draw' || isStatic ? false : false;

  useEffect(() => {
    if (!isStatic) {
      const element = document.getElementById(`square-${index}`);
      if (element && value) {
        element.setAttribute('aria-label', `${value.toUpperCase()} placed at position ${index + 1}`);
      }
    }
  }, [value, index, isStatic]);

  if (isStatic) {
    return (
      <motion.div
        className="board-square static"
        aria-hidden="true"
      >
        {clsName && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={clsName}
            aria-hidden="true"
          ></motion.span>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      id={`square-${index}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`board-square ${value} ${isWinningSquare ? 'winning' : ''}`}
      onClick={() => updateSquares(index)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          updateSquares(index);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Position ${index + 1}, ${value ? `${value.toUpperCase()}` : 'empty'}`}
      aria-disabled={!!value || !!winner}
    >
      {value && (
        <motion.span
          initial={{ scale: 0, rotate: value === 'x' ? -90 : 0 }}
          animate={{ scale: 1, rotate: 0 }}
          className={value}
          aria-hidden="true"
        ></motion.span>
      )}
    </motion.div>
  );
});

BoardSquare.displayName = 'BoardSquare';

export default BoardSquare;