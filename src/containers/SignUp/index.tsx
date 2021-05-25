import React from "react";
import {
    Button,
    Grid,
    Link,
    TextField,
} from "@material-ui/core";
import {colors} from "../../default_color";

interface IState{
    id_user?: number;
    username: string;
    email: string;
    password: string;
    genres?: string[];
    languages: string;
}

export default class SignUp extends React.Component<any, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            genres: [],
            languages: '',
        }
    }

    render() {
        return (
            <Grid
                  style={{height:'90%'}}
                  container
                  direction="column"
                  justify="center"
                  alignItems="center">
                <h1 style={{color: colors.orangeButton}}>Inscrivez-vous !</h1>
                <form style={{backgroundColor:colors.white, padding:'2em', width:"40%"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                // onChange={this.changeUserNameHandler}
                                autoComplete="fname"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirm-password"
                                label="Confirm your password"
                                type="password"
                                id="confirm-password"
                            />
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="http://localhost:3000/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        );
    }
}