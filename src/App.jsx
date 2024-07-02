import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Flashcards from './components/Flashcards';
import Questions from './components/Questions';
import Navigation from './components/Navigation';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Flashcards} />
          <Route path="/questions" component={Questions} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
