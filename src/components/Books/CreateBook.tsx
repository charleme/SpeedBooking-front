import {Component} from "react";
import { withRouter } from "react-router-dom";
import IBook from "../../data_interface/IBook";
import IGenre from "../../data_interface/IGenre";
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

    onSubmitHandler =(book:IBook, genres: IGenre[]) =>{
        const userId = localStorage.getItem("id");
        if(userId){
            book.id_author = parseInt(userId);
            BookHelpers.createBook(book, genres).then(res => {
                console.log("Création réussite");
                this.props.history.push("/profile");
            }).catch(error => {
                console.log(error)
            })
        }
        
    }
    

    render() {
        return (
            <Form title="Ajouter mon livre" width={60}>
                <BookForm onSubmitHandler={this.onSubmitHandler} edit={false}/>
            </Form>
        );
    }
}

export default withRouter(CreateBook);