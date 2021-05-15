import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/Home';

function App() {
  return (
    <div className="App">
      <Router>      
        <Switch>
          <Route path = "/" exact component = {Home}></Route>
        </Switch>      
      </Router>
    </div>

  );
}

export default App;
