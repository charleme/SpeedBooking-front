import { Grid } from "@material-ui/core";
import React, {Component} from "react";
import IBook, { mockBook } from "../../data_interface/IBook";
import { colors } from "../../default_color";
import BookForm from "./BookForm";
import {IEditBookProps, IEditBookStates} from "./IEditBook"
import { withRouter } from "react-router-dom";
import Form from "../Form/Form";

/**
 * @todo check if the id book in url params is wrote by the connected user
 */
class EditBook extends Component<IEditBookProps, IEditBookStates> {
    constructor(props: IEditBookProps) {
        super(props);
        this.state = {  };

        const search = this.props.location.search;
        const name = new URLSearchParams(search).get("id");

        console.log(name)
        this.onSubmitHandler.bind(this);
    }

    onSubmitHandler =(book:IBook) =>{
        console.log(book);
    }
    

    render() {
        return (
            <Form title="Modifier mon livre" width={60}>
                <BookForm onSubmitHandler={this.onSubmitHandler} edit={true} book={mockBook}/>
            </Form>
        );
    }
}

export default withRouter(EditBook);