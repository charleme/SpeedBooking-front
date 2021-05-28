import React, { useEffect, useState } from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import RequestTest from './containers/RequestTest';
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import HeadBand from "./components/HeadBand";
import Container from "@material-ui/core/Container";
import SignUp from "./containers/SignUp";
import SettingsPage from "./containers/Settings/SettingsPage";
import LikedBookPage from "./containers/LikedBook/LikedBookPage";
import {colors} from "./default_color";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ConnectedHomePage from './containers/ConnectedHomePage/ConnectedHomePage';
import CreateBookPage from './containers/CreateBookPage/CreateBookPage';
import EditBookPage from './containers/EditBookPage/EditBookPage';
import EditPasswordPage from './containers/EditPasswordPage/EditPasswordPage';

const theme = createMuiTheme(
	colors.theme
);

function App() {
	const [userConnected, setUserConnected] = useState(false)


	useEffect(() =>{
		localStorage.setItem("id", "1") // User 1 connected
		//localStorage.removeItem("id")  // nobody connected

		const currentUserId:number|null  = (localStorage.getItem("id") !== null) ? Number(localStorage.getItem("id")) : null ;
		setUserConnected(currentUserId !== null); 
	})

  return (
    <div className="App">
		<ThemeProvider theme={theme}>
			<Container disableGutters={true} maxWidth="xl" style={{height:'100%', backgroundColor: colors.orangeInnerPage}}>
				
				<Router>
					<HeadBand/>
					{(!userConnected) ? (
						<Switch>
							<Route path ="/" exact component = {Home}></Route>
							<Route path = "/signup" component = {SignUp}></Route>
							<Route path = "/request" component = {RequestTest}></Route>
						</Switch>
					)
					:(
						<Switch>
							<Route path ="/" exact component = {ConnectedHomePage}></Route>
							<Route path = "/request" component = {RequestTest}></Route>
							<Route path = "/profile" component = {ProfilePage}></Route>
							<Route path = "/liked-book" component = {LikedBookPage}></Route>
							<Route path = "/settings" component = {SettingsPage}></Route>
							<Route path = "/profile" component = {ProfilePage}></Route>
							<Route path = "/createBook" component = {CreateBookPage}></Route>
							<Route path = "/editBook" component = {EditBookPage}></Route>
							<Route path = "/editPassword" component = {EditPasswordPage}></Route>
						</Switch>
					)};
				</Router>
			</Container>
		</ThemeProvider>

    </div>
  );
}

export default App;
