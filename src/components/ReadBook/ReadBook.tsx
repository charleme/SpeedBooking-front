import {Component} from "react";
import Form from "../Form/Form";
import { IReadBookProps, IReadBookStates } from "./IReadBook";

class ReadBook extends Component<IReadBookProps, IReadBookStates> {
    constructor(props:IReadBookProps) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Form title={this.props.book.titleBook} width={80}>
                <div style={{padding:"20px"}}>
                    {this.props.book.firstChapter}
                </div>
            </Form>
        );
    }
}

export default ReadBook;