import { Grid } from "@material-ui/core";
import {Component} from "react";
import { colors } from "../../default_color";
import { IFormProps, IFormStates } from "./IForm";

let width:string = "";

class Form extends Component<IFormProps, IFormStates> {
    constructor(props: IFormProps) {
        super(props);
        this.state = {  };
        
        width = (this.props.width) ? this.props.width + "%" : "50%";
    }
    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <h1 style={{color: colors.orangeButton}}>{this.props.title}</h1>
                <form style={{backgroundColor:colors.white, padding:'2em', width:width, marginBottom:"30px"}}>
                        {this.props.children}
                </form>
            </Grid>
        );
    }
}

export default Form;