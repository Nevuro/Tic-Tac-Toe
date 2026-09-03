import GameBoard from './components/GameBoard/GameBoard';
import TurnIndicator from './components/TurnIndicator/TurnIndicator';
import Modal from './components/Modal/Modal';
import GameControls from './components/GameControls/GameControls';
import HistoryPanel from './components/HistoryPanel/HistoryPanel';
import NewGameButton from './components/NewGameButton/NewGameButton';
import './App.scss';

function App() {
  return (
    <div className="tic-tac-toe">
      <header className="app-header">
        <h1>TIC-TAC-TOE</h1>
        <NewGameButton />
      </header>
      
      <main className="app-main">
        <div className="game-area">
          <GameControls />
          <GameBoard />
          <TurnIndicator />
        </div>
        
        <HistoryPanel />
      </main>

      <Modal />
    </div>
  );
}

export default App;