import React from "react";
import {
    Button,
    CircularProgress,
    Grid,
    Link,
    TextField,
} from "@material-ui/core";
import {colors} from "../../default_color";
import {Autocomplete} from "@material-ui/lab";
import * as locales from '@material-ui/core/locale';
import UserHelpers from "../../helpers/UserHelpers";
import IUser from "../../data_interface/IUser";
import IGenre from "../../data_interface/IGenre"
import GenreHelpers from "../../helpers/GenreHelpers";

interface IState{
    id_user?: number;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    genres: string[];
    languages: string | null;
    color: boolean;
    genreList?: IGenre[];
}


export default class SignUp extends React.Component<any, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password:'',
            genres: [],
            languages: '',
            color: false
        }
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeConfirmPasswordHandler = this.changeConfirmPasswordHandler.bind(this);
        this.changeLanguagesHandler = this.changeLanguagesHandler.bind(this);
        this.changeGenreHandler = this.changeGenreHandler.bind(this);
        this.createUser = this.createUser.bind(this);

    }

    componentDidMount = () => {
        
        GenreHelpers.getAllGenres().then(resp =>{
            this.setState({genreList: resp.data})
        })
    }


    changeUsernameHandler = (event: any) => {
        this.setState({username: event.target.value});
    }

    changeEmailHandler = (event: any) => {
        this.setState({email: event.target.value});
    }

    changePasswordHandler = (event: any) => {
        this.setState({password: event.target.value});
    }

    changeConfirmPasswordHandler = (event: any) => {
        if(this.state.password !== event.target.value){
            this.setState({color: true});
            this.setState({confirm_password: ''});
        }else{
            this.setState({color: false});
            this.setState({confirm_password: event.target.value});
        }
    }

    changeLanguagesHandler = (event: any, newValue: string | null) => {
        this.setState({languages: newValue });
    }

    changeGenreHandler = async (event: any, newValues: IGenre[]) => {
        const genresCopy: string[] = []
        
        newValues.forEach(genre => {
            genresCopy.push(genre.nameGenre)
        });
        await this.setState({genres: genresCopy})
    }

    createUser = (e: any) => {
        e.preventDefault();
        if(this.state.password === this.state.confirm_password && this.state.username !== '' && this.state.email !== '' && this.state.password !== '' && this.state.languages !== '' && this.state.languages !== null){
            let user: IUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                languages: this.state.languages,
            }
            let list = this.state.genres

            UserHelpers.createUser(user, list).then(res => {
                this.props.history.push('/')
            })
        }else{
            alert("Please fill the registration form correctly")
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
                                onChange={this.changeUsernameHandler}
                                autoComplete="fname"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Nom d'utilisateur"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={this.changeEmailHandler}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Adresse mail"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={this.state.color}
                                onChange={this.changePasswordHandler}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={this.state.color}
                                onChange={this.changeConfirmPasswordHandler}
                                variant="outlined"
                                required
                                fullWidth
                                name="confirm-password"
                                label="Confirmation de votre mot de passe"
                                type="password"
                                id="confirm-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={Object.keys(locales)}
                                getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Langue" variant="outlined" />}
                                onChange={this.changeLanguagesHandler}
                            />
                        </Grid>
                        {
                        (this.state.genreList) ? (
                            <Grid item xs={12}>
                                <Autocomplete
                                    aria-required
                                    multiple
                                    id="tags-outlined"
                                    options={this.state.genreList}
                                    getOptionLabel={(option) => option.nameGenre}
                                    filterSelectedOptions
                                    onChange={this.changeGenreHandler}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Genres"
                                            placeholder="Book genres"
                                        />
                                    )}
                                />
                            </Grid>
                        ) : (
                            <CircularProgress color="primary"/>
                        )
                    }
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                    <Grid  container
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
                                onClick={this.createUser}
                            >
                                S'inscrire
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="http://localhost:3000/signin"
                                  variant="body2"
                                  style={{color:colors.orangeButton}}>
                                Vous avez déjà un compte ? Connectez-vous
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        );
    }
}