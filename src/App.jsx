import { useState } from 'react';
import Flashcards from './components/Flashcards';
import Questions from './components/Questions';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('flashcards');

  return (
    <div className="app">
      {currentView === 'flashcards' ? <Flashcards /> : <Questions />}
      <div className="navigation">
        <button onClick={() => setCurrentView('flashcards')}>Flashcards</button>
        <button onClick={() => setCurrentView('questions')}>Questions</button>
      </div>
    </div>
  );
};

export default App;