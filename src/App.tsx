import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import RequestTest from './containers/RequestTest';
import HeadBand from "./components/HeadBand";
import Container from "@material-ui/core/Container";
import SignUp from "./containers/SignUp";
import {colors} from "./default_color";

function App() {
  return (
    <div className="App">
        <Container disableGutters={true} maxWidth="xl" style={{height:'100%', backgroundColor: colors.orangeInnerPage}}>
            <HeadBand/>
            <Router>
            <Switch>
                <Route path = "/" exact component = {Home}></Route>
                <Route path = "/request" component = {RequestTest}></Route>
                <Route path = "/signup" component = {SignUp}></Route>
            </Switch>
            </Router>
        </Container>

    </div>
  );
}

export default App;
