import { Grid } from "@material-ui/core";
import React, {Component} from "react";
import IBook from "../../data_interface/IBook";
import { colors } from "../../default_color";
import BookForm from "./BookForm";
import {ICreateBookProps, ICreateBookStates} from "./ICreateBook"

class CreateBook extends Component<ICreateBookProps, ICreateBookStates> {
    constructor(props: ICreateBookProps) {
        super(props);
        this.state = {  };
        
        this.onSubmitHandler.bind(this);
    }

    onSubmitHandler =(book:IBook) =>{
        console.log(book);
    }
    

    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <h1 style={{color: colors.orangeButton}}>Ajouter mon livre</h1>
                <BookForm onSubmitHandler={this.onSubmitHandler} edit={false}/>
            </Grid>
        );
    }
}

export default CreateBook;