import React from "react";
import {Grid, LinearProgress} from "@material-ui/core";

interface IProps {
    titleBook: string;
    imageBook: string;
    progress: number;

}

export default class BookWithProgress extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const titleBook = (this.props.titleBook.length > 14 ? this.props.titleBook.substring(0,14).concat("...") : this.props.titleBook)
        const imageBook = this.props.imageBook
        const progress = this.props.progress
        return (
            <Grid container
                  justify="center"
                  alignItems="center"
                  spacing={0}
                  style={{height:"265px", width:"190px", margin: "3em 2em 1em 3em", border:"1px solid black"}}>
                <Grid item style={{border:"1px solid green"}}>
                    <img src={imageBook} width="150px" height="225px" alt={titleBook}/>
                </Grid>
                <Grid item style={{border:"1px solid red"}}>
                    <LinearProgress style={{width:"150px"}} variant="determinate" value={progress} />
                </Grid>
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="flex-start"
                      style={{border:"1px solid blue", width:"150px"}}>
                    <div style={{fontWeight:"bold"}}>{titleBook}</div>
                </Grid>
            </Grid>
        );
    }
}