import { AnimatePresence, motion } from 'framer-motion';
import { useGameContext } from '../../store/GameContext';
import BoardSquare from '../BoardSquare/BoardSquare';
import NewGameButton from '../NewGameButton/NewGameButton';
import './Modal.scss';

const Modal = () => {
  const { winner, resetGame, scores, draws } = useGameContext();

  if (!winner) return null;

  const isDraw = winner === 'draw';

  return (
    <AnimatePresence>
      <motion.div
        key="winner-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="winner-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="winner-title"
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="winner-content"
        >
          <motion.h2
            id="winner-title"
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
            className="winner-message"
          >
            {isDraw ? 'Draw Game!' : `Player ${winner.toUpperCase()} Wins!`}
          </motion.h2>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.5, duration: 0.3 } }}
            className="winner-display"
          >
            {isDraw ? (
              <>
                <BoardSquare index={0} clsName="x" isStatic />
                <BoardSquare index={1} clsName="o" isStatic />
              </>
            ) : (
              <BoardSquare index={0} clsName={winner as 'x' | 'o'} isStatic />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.3 } }}
            className="score-board"
          >
            <div className="score-item">
              <span className="score-label">Player X</span>
              <span className="score-value">{scores.x}</span>
            </div>
            <div className="score-item">
              <span className="score-label">Draws</span>
              <span className="score-value">{draws}</span>
            </div>
            <div className="score-item">
              <span className="score-label">Player O</span>
              <span className="score-value">{scores.o}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.3 } }}
            className="modal-actions"
          >
            <NewGameButton onClick={resetGame} />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;