import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import GamePlay from './game_play'
import './App.css';

function App() {
  return (
    <div className="content">
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/game-play" component={GamePlay} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
