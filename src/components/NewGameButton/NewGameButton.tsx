import { memo } from 'react';
import { useGameContext } from '../../store/GameContext';
import './NewGameButton.scss';

interface NewGameButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

const NewGameButton = memo(({ onClick, children = 'New Game' }: NewGameButtonProps) => {
  const { resetGame } = useGameContext();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      resetGame();
    }
  };

  return (
    <button 
      onClick={handleClick} 
      className="new-game-btn"
      aria-label="Start a new game"
    >
      {children}
    </button>
  );
});

NewGameButton.displayName = 'NewGameButton';

export default NewGameButton;