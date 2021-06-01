import { CircularProgress, Grid } from "@material-ui/core";
import React, {Component} from "react";
import IBook, { mockBook } from "../../data_interface/IBook";
import { colors } from "../../default_color";
import BookForm from "./BookForm";
import {IEditBookProps, IEditBookStates} from "./IEditBook"
import { withRouter } from "react-router-dom";
import Form from "../Form/Form";
import BookHelpers from "../../helpers/BookHelpers";

let oldBook:IBook; 
let currentUserId = localStorage.getItem("id");
let bookId:number = 0
/**
 * @todo check if the id book in url params is wrote by the connected user
 */
class EditBook extends Component<IEditBookProps, IEditBookStates> {
    constructor(props: IEditBookProps) {
        super(props);
        this.state = { book: undefined };

        currentUserId = localStorage.getItem("id");
        const search = this.props.location.search;
        let bookIdString = new URLSearchParams(search).get("id")
        
        if(bookIdString){
            bookId = parseInt(bookIdString);
        }else{
            this.props.history.push("/createBook")
        }
            

        this.onSubmitHandler.bind(this);
    }

    componentDidMount = () => {
        if(currentUserId)
            BookHelpers.isAuthor(bookId, parseInt(currentUserId)).then(response => {
                if(response.data)
                    BookHelpers.getBookById(bookId).then(response2 => {
                        oldBook = response2.data 
                        this.setState({book: oldBook})
                    }).catch(error => {
                        console.error("Aucun livre trouvé")
                    })
                else{
                    console.error("Le livre a modifier n'appartient pas à l'utilisateur connecté")
                    this.props.history.push("/createBook");
                }
            }).catch(error =>{
                console.error("Aucun livre reconnu")
                this.props.history.push("/createBook")
            })
        else{
            console.error("Aucun utilisateur connecté ")
            this.props.history.push("/createBook")
        }
    }

    onSubmitHandler =(book:IBook) =>{
        BookHelpers.updateBook(book).then(res => {
            console.log("Modification Réussite")
        }).catch(error =>{
            console.error(error);
        })
    }
    

    render() {

        return (
            <Form title="Modifier mon livre" width={60}>
                {
                    (this.state.book) ? (
                    <BookForm onSubmitHandler={this.onSubmitHandler} edit={true} book={this.state.book}/>
                        ): (
                            <CircularProgress />
                        )
                }
                
            </Form>
        );
    }
}

export default withRouter(EditBook);