import React, {Component} from "react"
import PageWithNav from "../../components/NavBar/PageWithNav";
import Form from "../../components/Form/Form";

class ConnectedHomePage extends Component {
    render() {
        return (
            <PageWithNav selected = {1}>
                <Form title={"Selection"}>

                </Form>
            </PageWithNav>
        );
    }
}

export default ConnectedHomePage;