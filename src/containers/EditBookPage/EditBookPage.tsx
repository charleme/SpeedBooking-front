import {Component} from "react";
import PageWithNav from "../../components/NavBar/PageWithNav";
import EditBook from "../../components/Books/EditBook"

class EditBookPage extends Component {
    render() {
        return (
            <PageWithNav selected={2}>
                <EditBook/>
            </PageWithNav>
        );
    }
}

export default EditBookPage;