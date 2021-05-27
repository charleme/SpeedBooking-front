import React, {Component} from 'react'
import PageWithNav from '../../components/NavBar/PageWithNav';
import {Grid} from "@material-ui/core";
import UserHelpers from "../../helpers/UserHelpers";
import {IBookWithProgress} from "../../data_interface/IBook";
import {FavoriteBorder} from "@material-ui/icons";
import {colors} from "../../default_color";
import BookWithProgress from "../../components/BookWithProgress";

export interface IStates{
    listBook: IBookWithProgress[]
}

export default class LikedBookPage extends Component<any, IStates> {
    constructor(props:any) {
        super(props);
        this.state = {
            listBook: []
        }
    }


    componentDidMount() {
        UserHelpers.getUserReadBooks(1).then(async res => {
            for(const [key, book] of Object.entries(res.data)){
                await this.setState({listBook: this.state.listBook.concat(book)})
            }
            console.log(this.state.listBook)
        })
    }

    render() {
        const listLenght = this.state.listBook.length
        const library = (listLenght > 0
            ?
            this.state.listBook.map((book)=>
                <BookWithProgress titleBook={book['titleBook']} imageBook={book['imageBook']} progress={book['progress']} idBook={book['idBook']}/>
            )
            :
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{margin:"35% 0 35% 0"}}>
                <h1 style={{color:colors.orangeButton}}>Your Library is empty</h1>
            </Grid>
        )

        return (
            <PageWithNav selected={3}>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      style={{height:'100%'}}>
                    <Grid container xs={12}
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-end"
                          style={{height:'12%'}}>
                        <Grid container
                              direction="row"
                              justify="flex-start"
                              alignItems="center"
                              xs={3}
                              style={{height:'100%',paddingLeft:"2em"}}>
                            <FavoriteBorder color="primary" fontSize="large"/>
                            <h1 style={{color:colors.orangeButton}}>J'aime</h1>
                        </Grid>
                    </Grid>
                    <Grid container xs={12}
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-start"
                          spacing={3}
                          style={{height:'85%'}}>
                        {library}
                    </Grid>
                </Grid>
            </PageWithNav>
        );
    }
}