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
    Snackbar,
    TextField
} from "@material-ui/core";
import { Alert, Autocomplete } from "@material-ui/lab";
import Form from "../Form/Form";
import {withRouter, Link} from "react-router-dom"
import UserHelpers from "../../helpers/UserHelpers";
import FormTextField from "../Form/FormTextField";
import BooksDisplay from "../Books/BooksDisplay";
import IUser from "../../data_interface/IUser";

let currentUser: IUser;
let textFields: ITextField[] = [];

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
            language: "",
            openSnackError:false,
            openSnackSuccess:false,
        };
        
        this.changeUsernameHandler.bind(this);
        this.changeEmailHandler.bind(this);
        this.setFieldData.bind(this);
        this.changeEmailHandler.bind(this);
        this.changeLanguagesHandler.bind(this);
        this.handleSnackErrorClose.bind(this);
        this.handleSnackSuccessClose.bind(this);
        this.submitChange.bind(this);
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

    changeLanguagesHandler = (event: any, newValue: string | null) => {
        if(newValue != null)
            this.setState({language: newValue});
    }

    setFieldData(){
        textFields = [
            {name:"username", label:"Login", autocomplete:"username", onChange:this.changeUsernameHandler, value: this.state.userName},
            {name:"email", label:"Adresse Mail", autocomplete:"email", onChange:this.changeEmailHandler, value: this.state.email},
        ]
    }

    handleSnackErrorClose = () => {
        this.setState({openSnackError:false})
    }

    handleSnackSuccessClose = () => {
        this.setState({openSnackSuccess:false})
    }

    submitChange = (e:React.MouseEvent<any>) => {
        e.preventDefault();
        currentUser.username = this.state.userName;
        currentUser.email = this.state.email;
        currentUser.languages = this.state.language;
        
        UserHelpers.updateUser(currentUser).then(response => {
            const newUser:IUser =  response.data
            if(newUser.email === currentUser.email 
                    && newUser.languages === currentUser.languages
                    && newUser.username === currentUser.username
                    && newUser.idUser === currentUser.idUser){
                
                console.log("Modification réussi");
                this.setState({openSnackSuccess:true})
            }
            else{
                console.error("Données mal mis à jour :")
                this.setState({openSnackError:true})
            }
        }).catch((error =>{
            console.error("Echec mise à jour des données:")
            this.setState({openSnackError:true})
        }))
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
                                id="combo-box-demo"
                                options={Object.keys(locales)}
                                getOptionLabel={(key) => `${key.substring(0, 2)}-${key.substring(2, 4)}`}
                                style={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Language" variant="outlined" />}
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
                            onClick={this.submitChange}
                            type="submit"
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
                        <Snackbar open={this.state.openSnackError} autoHideDuration={6000} onClose={this.handleSnackErrorClose}>
                            <Alert onClose={this.handleSnackErrorClose} severity="error">
                                Echec de la mise à jour des données
                            </Alert>
                        </Snackbar>
                        <Snackbar open={this.state.openSnackSuccess} autoHideDuration={6000} onClose={this.handleSnackSuccessClose}>
                            <Alert onClose={this.handleSnackSuccessClose} severity="success">
                                Mise à jour des données réussite
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Grid>
            </Form>
        );
    }
}

export default withRouter(Profile);