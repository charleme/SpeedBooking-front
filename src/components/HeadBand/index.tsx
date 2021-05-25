import React from "react";
import {Button, Grid} from "@material-ui/core";
import {color} from "../../default_color";

export default class HeadBand extends React.Component{

    render() {
        const link = window.location.href.substring(21, window.location.href.length)
        let contentUnlogged;
        if(link === "/"  || link === "/signin" || link === "/signup"){
            contentUnlogged = <Grid
                style={{height:'100%',  width:'310px'}}
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Button variant="contained"
                        size="large" color="primary"
                        href="http://localhost:3000/signin"
                        style={{backgroundColor:color.orangeButton}}>
                    Se connecter
                </Button>
                <Button variant="outlined"
                        size="large"
                        href="http://localhost:3000/signup"
                        style={{borderColor:color.orangeButton, color:color.orangeButton}}>
                    S'inscrire
                </Button>
            </Grid>
        }else{
            //TODO : Add profile information for the current connected user !
        }

        return (
                <Grid
                    style={{height:'9.99%', padding:'0 1.5em 0 0.8em', backgroundColor:color.white}}
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <img src={"logo.png"}  alt="SpeedBooking"/>
                    {contentUnlogged}
                </Grid>
        );
    }
}