import {Component} from "react";
import {IBookProps, IBookStates} from "./IBook"

import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core";

class Book extends Component<IBookProps, IBookStates> {
    constructor(props: IBookProps) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Card style={{margin:"0 5%"}}>
                <CardActionArea>
                    <CardMedia
                        style={{height:"180px", minHeight:"100%"}}
                        image={this.props.book.imageBook}
                        title={this.props.book.titleBook}
                    />
                    <CardContent>
                        <Typography>
                            {this.props.book.titleBook}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default Book;