import React, {Component} from "react";
import {IBooksDisplayProps, IBooksDisplayStates} from "./IBooksDisplay"

import { Grid, Typography } from "@material-ui/core";
import Book from "./Book";


class BooksDisplay extends Component<IBooksDisplayProps, IBooksDisplayStates> {
    constructor(props: IBooksDisplayProps) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Typography align="left" style={{margin:"10px"}}>Mes livres :</Typography>
                <Grid container direction="row" spacing={1}>
                    
                        {this.props.books.map(book =>
                            <Grid item xs={4} >
                                <Book book={book}/>
                            </Grid>
                        )}
                    
                </Grid>
            </div>
        );
    }
}

export default BooksDisplay;