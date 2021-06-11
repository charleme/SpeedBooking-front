import { Button, Grid, Link } from "@material-ui/core";
import {Component} from "react";
import Form from "../Form/Form";
import { ILink, IReadBookProps, IReadBookStates } from "./IReadBook";

let parsedLinks: ILink[] = []

class ReadBook extends Component<IReadBookProps, IReadBookStates> {
    constructor(props:IReadBookProps) {
        super(props);
        this.state = {  };

        this.parseLinks()
    }

    parseLinks = () => {
        parsedLinks = []
        Object.keys(this.props.book.links).forEach(key => {
            parsedLinks.push(
                {
                    name:key,
                    url: this.props.book.links[key]
                }
            )
        });
    }

    render() {
        return (
            <Form title={this.props.book.titleBook} width={80}>
                <div style={{padding:"20px 30px", textAlign: "left"}}>
                    {this.props.book.firstChapter.split('\n').map((value, index) => {
                    return (
                    <span key={index}>
                        {value}
                        <br />
                    </span>
                    );
                })}
                <Grid container direction="row" justify="space-around">
                    {parsedLinks.map(link=> (
                    <Grid key={link.name} item style={{marginTop: 20}}>
                        <Link href={link.url}>
                            <Button variant="contained" color="primary" style={{color:"white"}}>
                                {link.name}
                            </Button>
                        </Link>
                    </Grid>))
                    }
                </Grid>
                

                </div>
            </Form>
        );
    }
}

export default ReadBook;