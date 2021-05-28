import React, {Component} from "react";
import { IProfileProps, IProfileStates} from "./IProfile";
import {colors} from "../../default_color";
import {mockUser} from "../../data_interface/IUser"
import {mockBook} from "../../data_interface/IBook"
import { ITextField } from "../Form/IFormTextField";

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import { 
    Button,
    Grid,
    TextField
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { genres } from "../../genres";
import IGenre from "../../data_interface/IGenre";
import BooksDisplay from "../Books/BooksDisplay";
import * as locales from '@material-ui/core/locale';
import Form from "../Form/Form";
import {withRouter, Link} from "react-router-dom"

let textFields: ITextField[];
let jsxTextFields:JSX.Element[];

/**
 * @todo make submit
 * @todo display user current genre by default
 */
class Profile extends Component<IProfileProps, IProfileStates> {
    constructor(props:IProfileProps) {
        super(props);
        this.state = { 
            userName: mockUser.username,
            email: mockUser.email,
            genres: [],
            books: [mockBook],
            language: mockUser.languages
        };
        this.initiateFields();


        this.changeUsernameHandler.bind(this);
        this.changeEmailHandler.bind(this);
    }

    initiateFields(){
        textFields = [
            {name:"username", label:"Login", autocomplete:"username", onChange:this.changeUsernameHandler, default: this.state.userName},
            {name:"email", label:"Adresse Mail", autocomplete:"email", onChange:this.changeUsernameHandler, default: this.state.email},
        ]

        jsxTextFields = textFields.map(field => 
            
                <Grid item xs={12}>
                    <TextField
                        onChange={field.onChange}
                        autoComplete={field.autocomplete}
                        name={field.name}
                        variant="outlined"
                        required
                        fullWidth
                        id={field.name}
                        label={field.label}
                        defaultValue={field.default}                  
                    />
                </Grid>
            
            )
    }

    changeGenreHandler = (event: any, newValues: IGenre[]) => {       
        this.setState({genres: newValues})
    }

    changeUsernameHandler = (event:any) => {
        this.setState({userName: event.target.value});
    }

    changeEmailHandler = (event:any) => {
        this.setState({userName: event.target.value});
    }

    changeLanguagesHandler = (event:any) => {
        this.setState({language: event.target.value})
    }

    render() {
        return (
            <Form title="Mon Profil" width={50}>
                <Grid container spacing={2}  alignItems="center">
                    {jsxTextFields}
                    <Grid item xs={12}>
                        <Autocomplete
                            id="language"
                            options={Object.keys(locales)}
                            getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
                            style={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Langue" variant="outlined" />}
                            onChange={this.changeLanguagesHandler}
                            defaultValue={this.state.language}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={genres}
                            getOptionLabel={(option) => option.nameGenre}
                            filterSelectedOptions
                            onChange={this.changeGenreHandler}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Genres Favoris"
                                    placeholder="Favorite genres"
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <BooksDisplay books={this.state.books} />

                <Grid style={{marginTop:"20px"}} container justify="space-around"  alignItems="center" spacing={0}>
                    <Grid style={{marginTop:"20px"}} container direction="row" justify="space-around" spacing={0}>
                        <Button
                            style={{color:"white"}}
                            variant="contained"
                            color="primary"
                            size="medium"
                            startIcon={<SaveIcon />}
                        >
                            Sauvegarder
                        </Button>
                        
                        <Grid item xs={6}>
                            <Link to="/editPassword" style={{textDecoration:"none"}}>
                                <Button
                                
                                    variant="outlined"
                                    color="primary"
                                    size="medium"
                                    startIcon={<EditIcon />}
                                >
                                    Modifier mot de passe
                                </Button>
                            </Link>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Form>
        );
    }
}

export default withRouter(Profile);