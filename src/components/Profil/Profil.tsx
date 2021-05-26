import React, {Component} from "react";
import { IProfilProps, IProfilStates } from "./IProfil";
import { Grid } from "@material-ui/core";

class Profil extends Component<IProfilProps, IProfilStates> {
    constructor(props:IProfilProps) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Grid container spacing={5}>
                
            </Grid>  
        );
    }
}

export default Profil;