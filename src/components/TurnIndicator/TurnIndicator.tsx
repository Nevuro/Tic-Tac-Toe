import { memo } from 'react';
import { useGameContext } from '../../store/GameContext';
import BoardSquare from '../BoardSquare/BoardSquare';
import './TurnIndicator.scss';

const TurnIndicator = memo(() => {
  const { turn } = useGameContext();

  return (
    <div className={`turn-indicator ${turn === 'x' ? 'x-turn' : 'o-turn'}`} role="status" aria-live="polite">
      <BoardSquare index={0} clsName="x" isStatic />
      <BoardSquare index={1} clsName="o" isStatic />
      <span className="turn-label" aria-hidden="true">
        {turn.toUpperCase()}&apos;s Turn
      </span>
    </div>
  );
});

TurnIndicator.displayName = 'TurnIndicator';

export default TurnIndicator;