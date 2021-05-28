import React from "react";
import {Button, Grid} from "@material-ui/core";
import { Link } from "react-router-dom";
import {colors} from "../../default_color";
import UserHelpers from "../../helpers/UserHelpers";
import IUser from "../../data_interface/IUser"


export default class HeadBand extends React.Component{

    render() {
        const link = window.location.href.substring(21, window.location.href.length)
        let contentUnlogged;
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
            UserHelpers.getUserById(currentUserId).then(function(response){
                const user:IUser = response.data
            })
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
                    {contentUnlogged}
                </Grid>
        );
    }
}