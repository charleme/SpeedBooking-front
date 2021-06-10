import { Button, Grid, Snackbar } from "@material-ui/core";
import React, {Component} from "react";
import { Link } from "react-router-dom";
import { colors } from "../../default_color";
import Form from "../Form/Form";
import FormTextField from "../Form/FormTextField";
import { ITextField } from "../Form/IFormTextField";
import { IEditPasswordProps, IEditPasswordStates } from "./IEditPassword";
import SaveIcon from '@material-ui/icons/Save';
import PersonIcon from '@material-ui/icons/Person';
import UserHelpers from "../../helpers/UserHelpers";
import { Alert } from "@material-ui/lab";
import { isConstructorDeclaration } from "typescript";

let textFields: ITextField[] = [] 

class EditPassword extends Component<IEditPasswordProps, IEditPasswordStates> {
    constructor(props: IEditPasswordProps) {
        super(props);
        this.state = { oldPassword: "" ,newPassword:"", confirmPassword:"", errorConfirmPassword: false, errorSnackBar: false, successSnackBar: false, errorSnackBarMessage:"" };
        
        this.changeOldPasswordHandler.bind(this);
        this.changeNewPasswordHandler.bind(this);
        this.changeConfirmPasswordHandler.bind(this);
    }

    initTextFields = () => {
        textFields = [
            {name: "oldPassword", label: "Ancien Mot de passe", password:true, onChange:this.changeOldPasswordHandler, autocomplete:"old-password"},
            {name: "newPassword", label: "Nouveau Mot de passe", password:true, onChange:this.changeNewPasswordHandler, autocomplete:"new-password"},
            {name: "confirmPassword", label: "Confirmer le Mot de passe", password:true, onChange:this.changeConfirmPasswordHandler, autocomplete: "new-password", error: this.state.errorConfirmPassword}
        ]
    }

    changeOldPasswordHandler = (event:any) => {
        this.setState({oldPassword: event.target.value})
    }

    changeNewPasswordHandler = (event: any) => {
        this.setState({
            newPassword: event.target.value,
            errorConfirmPassword:event.target.value !== this.state.confirmPassword
        });
    }

    changeConfirmPasswordHandler = (event: any) => {
        this.setState({
            confirmPassword: event.target.value,
            errorConfirmPassword:event.target.value !== this.state.newPassword
        })
    }

    handleCloseSuccessSnackBar = () => {
        this.setState({successSnackBar:false});
    }

    handleCloseErrorSnackBar = () => {
        this.setState({errorSnackBar:false});
    }

    onSubmit =(e:React.MouseEvent<any>) => {
        e.preventDefault()
        e.stopPropagation()
        if(!this.state.errorConfirmPassword){
            if(this.state.newPassword.length >= 8){
                const connectedUserId:string|null = localStorage.getItem("id");
                if(connectedUserId){
                    
                    const userId:number = parseInt(connectedUserId)
                    UserHelpers.isUserPassword(userId, this.state.oldPassword).then(response =>{
                        if(response.data){
                            UserHelpers.editPassword(userId, this.state.newPassword).then(res => {
                                console.log("Modification du mot de passe réussite")
                                this.setState({successSnackBar : true})
                            }).catch(error => {
                                console.error(error);
                                this.setState({
                                    errorSnackBar : true,
                                    errorSnackBarMessage: "Impossible de modifier le mot de passe, veuillez contacter le service de maintenance"
                                })
                            })
                        }else{
                            console.warn("old password incorrect")
                            this.setState({
                                errorSnackBar : true,
                                errorSnackBarMessage: "Mot de passe actuel incorrect"
                            })
                        }
                        
                    }).catch(error => {
                        console.error(error)
                        this.setState({
                            errorSnackBar : true,
                            errorSnackBarMessage: "Impossible de modifier le mot de passe, veuillez contacter le service de maintenance"
                        })
                    })
                    
                }else{
                    console.error("Aucun utilisateur détecté !!")
                    this.setState({
                        errorSnackBar : true,
                        errorSnackBarMessage: "Aucun utilisateur détecté"
                    })
                }
            }else{
                this.setState({
                    errorSnackBar : true,
                    errorSnackBarMessage: "Le nouveau mot de passe doit être composé de plus de 8 caractères"
                })
            }
        }else{
            this.setState({
                errorSnackBar : true,
                errorSnackBarMessage: "La confirmation du mot de passe n'est pas identique au nouveau mot de passe"
            })
        }
    }

    render() {
        this.initTextFields();
        
        return (
            <Form title="Modifier mon mot de passe">
                <Grid container spacing={2}  alignItems="center">
                {textFields.map(fieldInformation =>(
                    <FormTextField fieldInformation={fieldInformation}/>
                ))}
                <Grid style={{marginTop:"20px"}} container justify="space-around"  alignItems="center" spacing={0}>
                    <Grid container direction="row" justify="space-around" spacing={0}>
                        <Button 
                            type="submit" 
                            style={{color:"white"}} 
                            variant="contained" 
                            color="primary"
                            onClick={this.onSubmit}
                            startIcon={<SaveIcon />}
                        >
                            Modifier le mot de passe
                        </Button>
                        <Link style={{textDecoration:"none"}} to="/profile">
                            <Button 
                                variant="outlined" 
                                color="primary"
                                startIcon={<PersonIcon/>}
                            >
                                Revenir au profil
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                </Grid>
                <Snackbar open={this.state.errorSnackBar} autoHideDuration={6000} onClose={this.handleCloseErrorSnackBar}>
                    <Alert onClose={this.handleCloseErrorSnackBar} severity="error">
                        {this.state.errorSnackBarMessage}
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.successSnackBar} autoHideDuration={6000} onClose={this.handleCloseSuccessSnackBar}>
                    <Alert onClose={this.handleCloseSuccessSnackBar} severity="success">
                        Mise à jour du mot de passe
                    </Alert>
                </Snackbar>
            </Form>
        );
    }
}

export default EditPassword;