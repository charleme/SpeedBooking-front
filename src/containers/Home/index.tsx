import React from 'react';
import Container from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";

export default class Home extends React.Component {
    render() {
        return (
            <Container style={{height:'100%'}}>
                <Grid style={{height:'100%'}}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <h1>Bienvenue sur SpeedBooking !</h1>
                    <h2>Des milliers de livres t'attendent !</h2>
                    <br/>
                    <Button>Je me lance !</Button>
                </Grid>
            </Container>
        );
    }
}
