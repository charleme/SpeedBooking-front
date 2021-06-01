import React, {Component} from "react";

interface IProps {
    bookImg: string,
    bookName: string,
    bookSummary: string,
    bookGenre?:string[]
}

export class BookCard extends Component<IProps, any> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const titleBook = this.props.bookName;
        const titleBookFinal = (titleBook.length > 14 ? titleBook.substring(0,14).concat("...") : titleBook)
        const imageBook = this.props.bookImg
        const summary = this.props.bookSummary

        return (
            <div>
                <img src={imageBook} width="150px" height="225px"/>
                <h3>{titleBook}</h3>
                <div>{summary}</div>
            </div>
        );
    }
}