import React, {Component} from "react";
import { IProfileProps, IProfileStates} from "./IProfile";
import IBook from "../../data_interface/IBook"
import { ITextField } from "../Form/IFormTextField";
import * as locales from '@material-ui/core/locale';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import { 
    Button,
    Grid,
    TextField
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Form from "../Form/Form";
import {withRouter, Link} from "react-router-dom"
import UserHelpers from "../../helpers/UserHelpers";
import FormTextField from "../Form/FormTextField";
import BooksDisplay from "../Books/BooksDisplay";
import IUser from "../../data_interface/IUser";

let currentUser: IUser;
let textFields: ITextField[] = [];
let jsxTextFields:JSX.Element[];

/**
 * @todo make submit
 * @todo display user current genre by default
 */
class Profile extends Component<IProfileProps, IProfileStates> {
    constructor(props:IProfileProps) {
        super(props);
        this.state = { 
            userName: "",
            email: "",
            books: [],
            language: ""
        };
        
        this.changeUsernameHandler.bind(this);
        this.changeEmailHandler.bind(this);
    }

    componentDidMount = () => {
        const connectedUserId = localStorage.getItem("id")
        if(connectedUserId !== null){
            UserHelpers.getUserById(parseInt(connectedUserId)).then((response) => {
                currentUser = response.data;
                this.setState({userName: currentUser.username, language: currentUser.languages, email: currentUser.email});
            })
            UserHelpers.getWrittenBooks(parseInt(connectedUserId)).then((response) => {
                const books: IBook[] = response.data;
                this.setState({books: books});
            })
        }
    }

    changeUsernameHandler = (event:any) => {
        this.setState({userName: event.target.value});
    }

    changeEmailHandler = (event:any) => {
        this.setState({email: event.target.value});
    }

    changeLanguagesHandler = (event:any) => {
        this.setState({language: event.target.value})
    }

    setFieldData(){
        textFields = [
            {name:"username", label:"Login", autocomplete:"username", onChange:this.changeUsernameHandler, value: this.state.userName},
            {name:"email", label:"Adresse Mail", autocomplete:"email", onChange:this.changeEmailHandler, value: this.state.email},
        ]
    }

    render() {
        {this.setFieldData()}
        return (
            <Form title="Mon Profil" width={50}>
                <Grid container spacing={2}  alignItems="center">
                    {textFields.map(field=>(
                        <FormTextField fieldInformation={field} />
                    ))}
                    <Grid item xs={12}>
                        <Autocomplete
                            id="language"
                            options={Object.keys(locales)}
                            getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
                            style={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Langue" variant="outlined" />}
                            onChange={this.changeLanguagesHandler}
                            value={this.state.language}
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