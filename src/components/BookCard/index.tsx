import {Component} from "react";
import {Chip} from "@material-ui/core";
import IGenre from "../../data_interface/IGenre";

interface IProps {
    bookImg: string,
    bookName: string,
    bookSummary: string,
    bookGenres:any
}

export class BookCard extends Component<IProps, any> {

    render() {
        const titleBook = this.props.bookName;
        const imageBook = this.props.bookImg;
        const summary = this.props.bookSummary;
        const genres:IGenre[] = this.props.bookGenres;

        return (
            <div>
                <img src={imageBook} width="150px" height="225px" alt="book first page"/>
                <h3>{titleBook}</h3>
                {genres.map(genre => <Chip key={genre.idGenre} size="medium" style={{margin: "0.4em"}} label={genre.nameGenre}/>)}
                <div style={{overflow: "auto", height:"200px"}}>{summary}</div>
            </div>
        );
    }
}