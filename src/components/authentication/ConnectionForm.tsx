import React from 'react';

import { Button, TextField, Grid, Link, Snackbar } from "@material-ui/core";
import {colors} from "../../default_color";
import AuthentificationHelpers from "../../helpers/AuthentificationHelpers";
import {Alert} from "@material-ui/lab";

interface IState {
    id_user?: number;
    email: string;
    password: string;
    openSnackError: boolean;
}

class ConnectionForm extends React.Component<any, IState> {
    constructor(props:any){
        super(props);
        this.state = {
            email: '',
            password: '',
            openSnackError:false
        }

        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.connectUser = this.connectUser.bind(this);
        this.handleSnackErrorClose = this.handleSnackErrorClose.bind(this);
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
            if (res.data && res.data.idUser) {
                localStorage.setItem("id", res.data.idUser.toString());
                document.location.href = "/";
            } else {
                console.error("Your email or password is not correct. Please try again")
                this.setState({openSnackError:true})
            }
        }).catch(error => {
            console.error("Erreur requete " + error.message +" "+ error.stack);
        })
    }

    handleSnackErrorClose = () => {
        this.setState({openSnackError:false});
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
                                            Se connecter
                                            </Button>
                                        </Grid>    
                            </Grid>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link   href="http://localhost:3000/signup"
                                            variant="body2"
                                            style={{color:colors.orangeButton}}>
                                            Vous n'avez aucun compte ? Inscrivez-vous
                                    </Link>
                                </Grid>
                            </Grid>
                            <Snackbar open={this.state.openSnackError} autoHideDuration={6000} onClose={this.handleSnackErrorClose}>
                                <Alert onClose={this.handleSnackErrorClose} severity="error">
                                    Votre mail et mot de passe sont incorrects.
                                </Alert>
                            </Snackbar>
                        </Grid>
                    </form>
            </Grid>
        );
    }
}
export default ConnectionForm;