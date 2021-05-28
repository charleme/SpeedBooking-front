import { Grid } from "@material-ui/core";
import React, {Component} from "react"
import { colors } from "../../default_color";
import { INavBarProps } from "./INavBar";
import NavBar from "./NavBar";

class PageWithNav extends Component<INavBarProps, any> {
    constructor(props:INavBarProps) {
        super(props);
    }
    render() {
        return (
            <Grid container spacing={0} style={{minHeight:"90%", backgroundColor:colors.orangeInnerPage}}>
                <Grid item>
                    <NavBar selected={this.props.selected}/>
                </Grid>
                <Grid item xs>
                    {this.props.children}
                </Grid>
            </Grid>
        );
    }
}

export default PageWithNav;