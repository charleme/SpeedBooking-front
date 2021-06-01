import { Button, Grid } from "@material-ui/core";
import React, {Component} from "react";
import { Link } from "react-router-dom";
import { colors } from "../../default_color";
import Form from "../Form/Form";
import FormTextField from "../Form/FormTextField";
import { ITextField } from "../Form/IFormTextField";
import { IEditPasswordProps, IEditPasswordStates } from "./IEditPassword";

let textFields: ITextField[] = [] 

class EditPassword extends Component<IEditPasswordProps, IEditPasswordStates> {
    constructor(props: IEditPasswordProps) {
        super(props);
        this.state = { oldPassword: "" ,newPassword:"", confirmPassword:"" };

        this.initTextFields();
        
        this.changeOldPasswordHandler.bind(this);
        this.changeNewPasswordHandler.bind(this);
        this.changeConfirmPasswordHandler.bind(this);
    }

    initTextFields = () => {
        textFields = [
            {name: "oldPassword", label: "Ancien Mot de passe", password:true, onChange:this.changeOldPasswordHandler, autocomplete:"old-password"},
            {name: "newPassword", label: "Nouveau Mot de passe", password:true, onChange:this.changeNewPasswordHandler, autocomplete:"new-password"},
            {name: "confirmPassword", label: "Confirmer le Mot de passe", password:true, onChange:this.changeConfirmPasswordHandler, autocomplete: "new-password"}
        ]
    }

    changeOldPasswordHandler = (event:any) => {
        this.setState({oldPassword: event.target.value})
    }

    changeNewPasswordHandler = (event: any) => {
        this.setState({newPassword: event.target.value})
    }

    changeConfirmPasswordHandler = (event: any) => {
        this.setState({confirmPassword: event.target.value})
    }

    render() {
        return (
            <Form title="Modifier mon mot de passe">
                <Grid container spacing={2}  alignItems="center">
                {textFields.map(fieldInformation =>(
                    <FormTextField fieldInformation={fieldInformation}/>
                ))}
                <Grid style={{marginTop:"20px"}} container justify="space-around"  alignItems="center" spacing={0}>
                    <Grid container direction="row" justify="space-around" spacing={0}>
                        <Button type="submit" style={{color:"white"}} variant="contained" color="primary">Modifier le mot de passe</Button>
                        <Link style={{textDecoration:"none"}} to="/profile">
                            <Button variant="outlined" color="primary">Revenir au profil</Button>
                        </Link>
                    </Grid>
                </Grid>
                </Grid>
            </Form>
        );
    }
}

export default EditPassword;