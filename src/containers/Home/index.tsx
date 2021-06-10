import React from 'react';
import { Button, Grid } from "@material-ui/core";
import {colors} from "../../default_color";

export default class Home extends React.Component {
    render() {
        return (
                <Grid style={{height:'90%', backgroundColor:colors.homeTheme, color:colors.white}}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <h1>Bienvenue sur SpeedBooking !</h1>
                    <h2>Des milliers de livres t'attendent !</h2>
                    <br/>
                    <Button variant="outlined"
                            size="large"
                            href="http://localhost:3000/signin"
                            style={{borderColor:colors.white, color:colors.white}}>
                        JE ME LANCE
                    </Button>
                </Grid>
        );
    }
}
