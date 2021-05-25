import React from "react";
import {
    Button,
    Checkbox,
    FormControl, FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    Input,
    InputLabel, Link,
    TextField,
    Typography
} from "@material-ui/core";
import {colors} from "../../default_color";

export default class SignUp extends React.Component<any, any>{
    constructor(props: any) {
        super(props);

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
                {/*<FormGroup>*/}
                {/*    <FormControl>*/}
                {/*        <InputLabel htmlFor="my-input">Email address</InputLabel>*/}
                {/*        <Input style={{width:'40em', backgroundColor:colors.white}} id="my-input" aria-describedby="my-helper-text" />*/}
                {/*        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
                {/*    </FormControl>*/}
                <div style={{width:"60%"}}>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
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
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
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
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                {/*</FormGroup>*/}
            </Grid>
        );
    }
}