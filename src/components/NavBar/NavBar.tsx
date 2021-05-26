import React, {Component} from "react";
import { INavBarProps, INavItems } from "./INavBar";
import "./NavBar.scss"

import { withStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { 
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button
} from "@material-ui/core";

import { Link } from 'react-router-dom';

const navItems: INavItems[] = [
    {id:1, text: "Accueil", icon: <HomeIcon htmlColor="white" fontSize="large"/>, link: "/"},
    {id:2, text: "Profil", icon: <AccountCircleIcon htmlColor="white" fontSize="large"/>, link: "/profile"},
    {id:3, text: "J'aime", icon: <FavoriteIcon htmlColor="white" fontSize="large"/>, link: "/liked-book"},
    {id:4, text: "Paramètres", icon: <SettingsIcon htmlColor="white" fontSize="large"/>, link: "/settings"},
]


const StyledListItem= withStyles({
    root:{
        padding:"20px 16px",
    },
    selected:{
        backgroundColor: "#886CA0!important",
    }
  })(ListItem);

let jsxNavItem:JSX.Element[];


class NavBar extends Component<INavBarProps, {}> {
    constructor(props: INavBarProps){
        super(props);
        
        jsxNavItem = navItems.map((item)=>
            <Link to={item.link} style={{color:"white", textDecoration:"none"}}>
                <StyledListItem
                    className="item" 
                    button 
                    selected={item.id === this.props.selected}
                >
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text}/>
                </StyledListItem>
            </Link>
        )
    }

    render() {
        return (
            <Container maxWidth="xs" id="nav-bar" >
                <Grid
                    container
                    direction ="column"
                    alignItems="center"
                >
                    <List id="nav-list">
                        {jsxNavItem}
                    </List>
                    <Link to="/" style={{textDecoration:"none"}}>
                        <Button
                            size="small"
                            variant="contained" 
                            id="sign-out-button" 
                            startIcon={<ExitToAppIcon/>}
                            color="primary"
                            style={{color:"white"}}
                        >
                            Deconnexion
                        </Button>
                    </Link>
                </Grid>
                
            </Container>
        );
    }
}

export default NavBar;