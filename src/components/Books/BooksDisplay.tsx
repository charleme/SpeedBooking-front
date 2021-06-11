import React, {Component} from "react";
import {IBooksDisplayProps, IBooksDisplayStates} from "./IBooksDisplay"

import { Container, Grid, IconButton, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add"
import Book from "./Book";
import { Link } from "react-router-dom";


class BooksDisplay extends Component<IBooksDisplayProps, IBooksDisplayStates> {
    constructor(props: IBooksDisplayProps) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div>
                <Typography align="left" style={{margin:"10px"}}>Mes livres :</Typography>
                <Grid container direction="row" alignItems="center" spacing={1}>
                        
                        {this.props.books.map(book =>
                            
                            <Grid key={book.idBook} item xs={3} >
                                <Link to={"/editBook?id=" + book.idBook} style={{textDecoration:"none"}}>
                                    <Book book={book}/>
                                </Link>
                            </Grid>
                            
                        )}
                        
                        <Grid item xs={3}>
                        <Link to="/createBook" style={{textDecoration:"none"}}>
                            <Container>
                                <IconButton aria-label="add-book">
                                    <AddIcon color="primary"/>
                                </IconButton>
                                <Typography color="primary">
                                    Ajouter un livre
                                </Typography>
                            </Container>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default BooksDisplay;