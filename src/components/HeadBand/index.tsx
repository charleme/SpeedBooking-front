import React from "react";
import {Avatar, Button, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";
import {colors} from "../../default_color";
import UserHelpers from "../../helpers/UserHelpers";
import IUser from "../../data_interface/IUser"

let contentUnlogged: JSX.Element;
let contentLogged:JSX.Element;
export default class HeadBand extends React.Component<any, any>{
    constructor(props:any){
        super(props);

        this.state = {isLogged: false}
        this.getLoggedContent()
    }

    getLoggedContent = () => {
        const currentUserId:number|null  = (localStorage.getItem("id") !== null) ? Number(localStorage.getItem("id")) : null ;
        if(currentUserId === null){
            contentUnlogged = <Grid
                style={{height:'100%',  width:'330px'}}
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Button variant="contained"
                        size="large" color="primary"
                        href="http://localhost:3000/signin"
                        style={{backgroundColor:colors.orangeButton, color:colors.white}}>
                    Se connecter
                </Button>
                <Button variant="outlined"
                        size="large"
                        href="http://localhost:3000/signup"
                        style={{borderColor:colors.orangeButton, color:colors.orangeButton}}>
                    S'inscrire
                </Button>
            </Grid>
        }else{
            UserHelpers.getUserById(currentUserId).then((response) => {
                const user:IUser = response.data
                var randomColor = "#".concat(Math.floor((user.username.toLowerCase().charCodeAt(0)-97+user.username.toLowerCase().charCodeAt(1)-97)*(0xCCCCCC/50)).toString(16))

                contentLogged = <Grid style={{height:'100%',  width:'330px'}}
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center">
                    <Avatar style={{backgroundColor:randomColor, color:"white", marginRight:"3%"}}>
                        {user.username.substring(0,1)}
                    </Avatar>
                    <Link to="/profile" style={{textDecoration:"none"}}>
                        <h4>{user.username}</h4>
                    </Link>
                </Grid>
                this.setState({isLogged:true})
            })

        }
    }

    render() {
        
        

        return (
            <Grid
                style={{height:'9.99%', padding:'0 1.5em 0 0.8em', backgroundColor:colors.white}}
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Link to="/">
                    <img src={"logo.png"}  alt="SpeedBooking"/>
                </Link>
                {this.state.isLogged ? contentLogged : contentUnlogged}
            </Grid>
        );
    }
}