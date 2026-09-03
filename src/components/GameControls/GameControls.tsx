import { memo } from 'react';
import { useGameContext } from '../../store/GameContext';
import NewGameButton from '../NewGameButton/NewGameButton';
import './GameControls.scss';

const GameControls = memo(() => {
  const { mode, difficulty, setMode, setDifficulty, undoMove, history, resetGame } = useGameContext();

  return (
    <div className="game-controls" role="region" aria-label="Game controls">
      <div className="controls-row">
        <div className="mode-selector">
          <label htmlFor="mode-select" className="control-label">Mode</label>
          <select
            id="mode-select"
            value={mode}
            onChange={(e) => setMode(e.target.value as 'pvp' | 'pvai')}
            className="control-select"
            aria-label="Select game mode"
          >
            <option value="pvp">Player vs Player</option>
            <option value="pvai">Player vs AI</option>
          </select>
        </div>

        {mode === 'pvai' && (
          <div className="difficulty-selector">
            <label htmlFor="difficulty-select" className="control-label">Difficulty</label>
            <select
              id="difficulty-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
              className="control-select"
              aria-label="Select AI difficulty"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        )}
      </div>

      <div className="controls-row">
        <button
          onClick={undoMove}
          disabled={history.length === 0}
          className="control-btn undo-btn"
          aria-label="Undo last move"
          aria-disabled={history.length === 0}
        >
          Undo Move
        </button>

        <NewGameButton onClick={resetGame} />
      </div>
    </div>
  );
});

GameControls.displayName = 'GameControls';

export default GameControls;