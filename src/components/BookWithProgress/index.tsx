import React from "react";
import {Grid, LinearProgress, Link} from "@material-ui/core";
import {IProps} from "./IBookWithProgress";


export default class BookWithProgress extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const titleBook = this.props.titleBook;
        const titleBookFinal = (titleBook.length > 14 ? titleBook.substring(0,14).concat("...") : titleBook)
        const imageBook = this.props.imageBook
        const progress = this.props.progress
        const bookHref = "http://localhost:3000/readBook/".concat(String(this.props.idBook))
        return (
            <Grid container
                  justify="center"
                  alignItems="center"
                  spacing={0}
                  style={{height:"260px", width:"190px", margin: "0em 2em 1em 3em"}}>
                <Grid item>
                    <Link href={bookHref}>
                        <img src={imageBook} width="150px" height="225px" alt={titleBook}/>
                    </Link>
                </Grid>
                <Grid item>
                    <LinearProgress style={{width:"150px"}} variant="determinate" value={progress} />
                </Grid>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                      style={{width:"150px"}}>
                    <div style={{fontWeight:"bold"}}>{titleBookFinal}</div>
                </Grid>
            </Grid>
        );
    }
}