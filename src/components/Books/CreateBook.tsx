import React, {Component} from "react";
import IBook from "../../data_interface/IBook";
import BookHelpers from "../../helpers/BookHelpers";
import Form from "../Form/Form";
import BookForm from "./BookForm";
import {ICreateBookProps, ICreateBookStates} from "./ICreateBook"

class CreateBook extends Component<ICreateBookProps, ICreateBookStates> {
    constructor(props: ICreateBookProps) {
        super(props);
        this.state = {  };
        
        this.onSubmitHandler.bind(this);
    }

    onSubmitHandler =(book:IBook) =>{
        BookHelpers.createBook(book).then(res => {
            console.log("Modification réussite")
        }).catch(error => {
            console.log(error)
        })
    }
    

    render() {
        return (
            <Form title="Ajouter mon livre" width={60}>
                <BookForm onSubmitHandler={this.onSubmitHandler} edit={false}/>
            </Form>
        );
    }
}

export default CreateBook;