import React from 'react';
import Container from "@material-ui/core/Container";
import { Button, TextField, Grid, Link } from "@material-ui/core";
import {colors} from "../../default_color";
import AuthentificationHelpers from "../../helpers/AuthentificationHelpers";
import {Autocomplete} from "@material-ui/lab";

interface IState {
    id_user?: number;
    email: string;
    password: string;
}

export default class ConnectionForm extends React.Component<any, IState> {
    constructor(props:any){
        super(props);
        this.state = {
            email: '',
            password: '',
        }

        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.connectUser = this.connectUser.bind(this);
    }

    changeEmailHandler = (event: any) => {
        this.setState({email: event.target.value});
    }

    changePasswordHandler = (event: any) => {
        this.setState({password: event.target.value});
    }

    connectUser = (e: any) => {
        e.preventDefault();
        AuthentificationHelpers.authenticate(this.state.email, this.state.password).then(res => {
            if (res.data.idUser) {
                localStorage.setItem("id", res.data.idUser.toString());
                alert("Your are logged");
            } else {
                alert("Your email or password is not correct. Please try again");
            }
            //this.props.history.push('/')
        })
    }

    render() {
        return (
            <Grid
                style={{height:'90%'}}
                container
                direction="column"
                justify="center"
                alignItems="center">
                <h1 style={{color: colors.orangeButton}}>Content de vous revoir ! </h1>
                    <form style={{backgroundColor:colors.white, padding:'2em', width:"40%"}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={this.changeEmailHandler}
                                    type="email"
                                    autoComplete="email"
                                    name="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={this.changePasswordHandler}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    autoComplete="current-password"
                                    type="password"
                                />
                            </Grid>
      
                            <Grid   container
                                    direction="row"
                                    justify="center"
                                    alignItems="center">
                                        <Grid item xs={6}>
                                            <Button
                                                style={{color:"white"}}
                                                fullWidth
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                                onClick={this.connectUser}
                                            >
                                            Sign In
                                            </Button>
                                        </Grid>    
                            </Grid>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link   href="http://localhost:3000/signup"
                                            variant="body2"
                                            style={{color:colors.orangeButton}}>
                                            Don't have an account? Sign up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
            </Grid>
        );
    }
}