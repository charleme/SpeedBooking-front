import React, {Component} from "react"
import PageWithNav from "../../components/NavBar/PageWithNav";

class ConnectedHomePage extends Component {
    render() {
        return (
            <PageWithNav selected = {1}>
                home page for connected user
            </PageWithNav>
        );
    }
}

export default ConnectedHomePage;