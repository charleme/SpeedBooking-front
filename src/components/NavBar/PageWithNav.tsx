import { Grid } from "@material-ui/core";
import {Component} from "react"
import { colors } from "../../default_color";
import { INavBarProps } from "./INavBar";
import NavBar from "./NavBar";
import Counter from "../PresentationCounter/Counter";

class PageWithNav extends Component<INavBarProps, any> {
    render() {
        return (
            <Grid container spacing={0} style={{minHeight:"90%", backgroundColor:colors.orangeInnerPage}}>
                <Grid item>
                    <NavBar selected={this.props.selected}/>
                </Grid>
                <Grid item xs>
                    {this.props.children}
                </Grid>
                <Grid item>
                    <Counter/>
                </Grid>
            </Grid>
        );
    }
}

export default PageWithNav;