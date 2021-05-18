import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import RequestTest from './containers/RequestTest';

function App() {
  return (
    <div className="App">
      <Router>      
        <Switch>
          <Route path = "/" exact component = {Home}></Route>
          <Route path = "/request" component = {RequestTest}></Route>
        </Switch>      
      </Router>
    </div>
  );
}

export default App;
