import { CircularProgress } from "@material-ui/core";
import {Component} from "react";
import IBook from "../../data_interface/IBook";
import BookForm from "./BookForm";
import {IEditBookProps, IEditBookStates} from "./IEditBook"
import { withRouter } from "react-router-dom";
import Form from "../Form/Form";
import BookHelpers from "../../helpers/BookHelpers";
import IGenre from "../../data_interface/IGenre";

let currentUserId = localStorage.getItem("id");
let bookId:number = 0
/**
 * @todo check if the id book in url params is wrote by the connected user
 */
class EditBook extends Component<IEditBookProps, IEditBookStates> {
    constructor(props: IEditBookProps) {
        super(props);
        this.state = { book: undefined, genres: undefined };

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
                if(response.data){
                    BookHelpers.getBookById(bookId).then(response2 => {
                        const oldBook = response2.data 
                        this.setState({book: oldBook})
                    }).catch(error => {
                        console.error("Aucun livre trouvé")
                    });

                    BookHelpers.genresWithScore(bookId).then(response2 => {
                        const genresWithScore = response2.data;
                        const bookGenres:IGenre[] = genresWithScore.map(genreWithScore => {
                            return {
                                idGenre: genreWithScore.idGenre,
                                nameGenre: genreWithScore.nameGenre,
                            }
                        })

                        this.setState({genres: bookGenres})    
                    }).catch(error => {
                        console.error("error genres book request");
                    })
                }
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

    onSubmitHandler =(book:IBook, genres: IGenre[]) =>{
        BookHelpers.updateBook(book, genres).then(res => {
            console.log("Modification Réussite")
            this.props.history.push("/profile")
        }).catch(error =>{
            console.error(error);
        })
    }
    

    render() {

        return (
            <Form title="Modifier mon livre" width={60}>
                {
                    (this.state.book && this.state.genres) ? (
                    <BookForm onSubmitHandler={this.onSubmitHandler} edit={true} book={this.state.book} genres={this.state.genres}/>
                        ): (
                            <CircularProgress />
                        )
                }
                
            </Form>
        );
    }
}

export default withRouter(EditBook);