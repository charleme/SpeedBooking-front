import { CircularProgress } from "@material-ui/core";
import {Component} from "react";
import PageWithNav from "../../components/NavBar/PageWithNav";
import ReadBook from "../../components/ReadBook/ReadBook";
import IBook from "../../data_interface/IBook";
import BookHelpers from "../../helpers/BookHelpers";

class ReadBookPage extends Component<any, any> {
    constructor(props:any) {
        super(props);
        this.state = {book: null}
        
        const search = this.props.location.search;
        let bookIdString = new URLSearchParams(search).get("idBook")
        
        if(bookIdString){
            const bookId = parseInt(bookIdString);
            this.getBook(bookId)
        }else{
            this.props.history.push("/")
        }
    }

    getBook(bookId:number){
        BookHelpers.getBookById(bookId).then(res =>{
            const book:IBook = res.data;
            this.setState({book: book})
        })
    }

    render() {
        return (
            <PageWithNav selected={1}>
                {(this.state.book == null) ? <CircularProgress/> : <ReadBook book={this.state.book}/>}
            </PageWithNav>
        );
    }
}

export default ReadBookPage;