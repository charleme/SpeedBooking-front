import React from 'react';
import { Button, Grid } from "@material-ui/core";
import {color} from "../../default_color";

export default class Home extends React.Component {
    render() {
        return (
                <Grid style={{height:'100%', backgroundColor:color.homeTheme, color:color.white}}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <h1>Bienvenue sur SpeedBooking !</h1>
                    <h2>Des milliers de livres t'attendent !</h2>
                    <br/>
                    <Button variant="outlined" size="large" style={{borderColor:color.white, color:color.white}}>JE ME LANCE</Button>
                </Grid>
        );
    }
}
