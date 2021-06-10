import { Grid, TextField } from "@material-ui/core";
import {Component} from "react";
import { IFormTextFieldProps, IFormTextFieldStates } from "./IFormTextField";

class FormTextField extends Component<IFormTextFieldProps, IFormTextFieldStates> {
    constructor(props: IFormTextFieldProps) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Grid item xs={12}>
                <TextField
                    onChange={this.props.fieldInformation.onChange}
                    autoComplete={(this.props.fieldInformation.autocomplete !== undefined) ? this.props.fieldInformation.autocomplete : ""}
                    name={this.props.fieldInformation.name}
                    variant="outlined"
                    required
                    fullWidth
                    id={this.props.fieldInformation.name}
                    label={this.props.fieldInformation.label}
                    defaultValue={(this.props.fieldInformation.default !== undefined) ? this.props.fieldInformation.default : ""}
                    value={(this.props.fieldInformation.value !== undefined) ? this.props.fieldInformation.value : undefined}
                    multiline={(this.props.fieldInformation.multiline !== undefined) ? this.props.fieldInformation.multiline : false}
                    rows={this.props.fieldInformation.row}
                    type={(this.props.fieldInformation.password) ? "password" : undefined} 
                    error={(this.props.fieldInformation.error) ? this.props.fieldInformation.error : undefined}                  
                />
            </Grid>
        );
    }
}

export default FormTextField;