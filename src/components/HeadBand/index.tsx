import React from "react";
import {Avatar, Button, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";
import {colors} from "../../default_color";
import UserHelpers from "../../helpers/UserHelpers";
import IUser from "../../data_interface/IUser"

interface IState {
    user: IUser;
    currentUserId: number | null
}

export default class HeadBand extends React.Component<any, IState>{

    constructor(props: any) {
        super(props);

        this.state = {
            currentUserId: null,
            user: {
                username: '',
                email: '',
                password: '',
                languages: '',
            },
        }
    }
    componentDidMount() {
        this.setState({currentUserId: (localStorage.getItem("id") !== null) ? Number(localStorage.getItem("id")) : null})
        if(this.state.currentUserId !== null) {
            UserHelpers.getUserById(this.state.currentUserId).then((response) => {
                this.setState({user: response.data})
                console.log(this.state.user)
            })
        }
    }

    render() {
        const contentUnlogged = <Grid style={{height:'100%',  width:'330px'}}
                                      container
                                      direction="row"
                                      justify="space-between"
                                      alignItems="center">
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

        let content
        var randomColor = "#".concat(Math.floor(this.state.user.username.charCodeAt(0)*16777215).toString(16))
        console.log(Math.random()*16777215)

        if(this.state.currentUserId !== null) {
            content = <Grid style={{height:'100%',  width:'330px'}}
                            container
                            direction="row"
                            justify="center"
                            alignItems="center">
                        <Avatar style={{backgroundColor:randomColor, color:"white", marginRight:"3%"}}>
                            {this.state.user.username.substring(0,1)}
                        </Avatar>
                        <Link to="/profile" style={{textDecoration:"none"}}>
                            <h4>{this.state.user.username}</h4>
                        </Link>
                      </Grid>
        }else {
            content = contentUnlogged
        }

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
                    {content}
                </Grid>
        );
    }
}