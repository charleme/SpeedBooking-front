import {Component} from "react"
import EditPassword from "../../components/EditPassword/EditPassword";
import PageWithNav from "../../components/NavBar/PageWithNav";

class EditPasswordPage extends Component {
    render() {
        return (
            <PageWithNav selected={2}>
                <EditPassword/>
            </PageWithNav>
        );
    }
}

export default EditPasswordPage;