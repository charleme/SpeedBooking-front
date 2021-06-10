import {Component} from "react";

interface IProps {
    bookImg: string,
    bookName: string,
    bookSummary: string,
    bookGenre?:string[]
}

export class BookCard extends Component<IProps, any> {

    render() {
        const titleBook = this.props.bookName;
        const imageBook = this.props.bookImg
        const summary = this.props.bookSummary

        return (
            <div>
                <img src={imageBook} width="150px" height="225px" alt="book first page"/>
                <h3>{titleBook}</h3>
                <div style={{overflow: "auto", height:"200px"}}>{summary}</div>
            </div>
        );
    }
}