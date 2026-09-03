import { memo } from 'react';
import { useGameContext } from '../../store/GameContext';
import BoardSquare from '../BoardSquare/BoardSquare';
import './HistoryPanel.scss';

const HistoryPanel = memo(() => {
  const { history } = useGameContext();

  if (history.length === 0) return null;

  return (
    <aside className="history-panel" aria-label="Game history">
      <h3 className="history-title">Move History</h3>
      <div className="history-list" role="list">
        {history.map((entry, index) => (
          <button
            key={index}
            className={`history-item ${index === history.length - 1 ? 'current' : ''}`}
            onClick={() => {}}
            aria-label={`Move ${index + 1}`}
            role="listitem"
          >
            <span className="move-number">{index + 1}</span>
            <div className="move-preview">
              {entry.squares.map((value, sqIndex) => (
                <BoardSquare 
                  key={sqIndex} 
                  index={sqIndex} 
                  isStatic 
                  clsName={value as 'x' | 'o' | undefined}
                />
              ))}
            </div>
            <span className="move-player">
              {entry.turn === 'x' ? 'O' : 'X'} played
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
});

HistoryPanel.displayName = 'HistoryPanel';

export default HistoryPanel;