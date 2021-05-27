import {Component} from "react";
import CreateBook from "../../components/Books/CreateBook";
import PageWithNav from "../../components/NavBar/PageWithNav";

class CreateBookPage extends Component {
    render() {
        return (
            <PageWithNav selected={2}>
                <CreateBook/>
            </PageWithNav>
        );
    }
}

export default CreateBookPage;