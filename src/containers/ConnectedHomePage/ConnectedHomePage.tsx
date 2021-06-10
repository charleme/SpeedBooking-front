import React, {Component} from "react"
import PageWithNav from "../../components/NavBar/PageWithNav";
import Form from "../../components/Form/Form";
import IBook from "../../data_interface/IBook";
import UserHelpers from "../../helpers/UserHelpers";
import {CircularProgress, Container, Grid, IconButton, Slide} from "@material-ui/core";
import {colors} from "../../default_color";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import UserBookHelpers from "../../helpers/UserBookHelpers";
import BookHelpers from "../../helpers/BookHelpers";
import {BookCard} from "../../components/BookCard";
import "./Counter.scss";

interface IState {
    isLoading: boolean,
    listBook: IBook[],
    criticalSize: number,
    currentBookId: number,
    currentUserId: number,
    genres?: any
}

class ConnectedHomePage extends Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            listBook: [],
            criticalSize: 0,
            currentBookId: 0,
            currentUserId: Number(localStorage.getItem("id")),
            genres: []
        }

        this.like = this.like.bind(this)
        this.dislike = this.dislike.bind(this)
    }

    componentDidMount() {
        this.setState({isLoading: true})
        if (this.state.currentUserId !== null){
            UserHelpers.getTL(this.state.currentUserId).then(res => {
                this.setState({
                        listBook: this.state.listBook.concat(res.data),
                        criticalSize: res.data.length - 2
                    })
            })
            UserHelpers.getUserById(this.state.currentUserId).then(async res => {
                if(res.data.genres !== null){
                    const genreList = res.data.genres
                    if(genreList !== undefined){
                        const newGenre = Object.entries(genreList)
                        this.setState({genres: newGenre})
                    }
                }
            })
        }
        this.setState({isLoading: false})
    }

    like() {
        if (this.state.listBook[this.state.currentBookId].idBook !== undefined) {
            UserBookHelpers.createUserBook(this.state.currentUserId, this.state.listBook[this.state.currentBookId].idBook).then(res1 => {
                    UserHelpers.updateUserGenre(this.state.currentUserId, this.state.listBook[this.state.currentBookId].idBook).then(res2 => {
                                BookHelpers.likeBook(this.state.listBook[this.state.currentBookId].idBook, this.state.currentUserId).then(res3 => {
                                    this.setState({currentBookId: this.state.currentBookId+1});
                                    console.log("Book liked");
                                })
                    })
            })
        }
        if (this.state.currentBookId === this.state.criticalSize) {
            UserHelpers.getTL(this.state.currentUserId).then(result => {
                this.setState({
                    listBook: [this.state.listBook[this.state.listBook.length-1], ...result.data],
                    currentBookId: 0
                })
            })
        }
        UserHelpers.getUserById(this.state.currentUserId).then(async res => {
            if(res.data.genres !== null){
                const genreList = res.data.genres
                if(genreList !== undefined){
                    const newGenre = Object.entries(genreList)
                    this.setState({genres: newGenre})
                }
            }
        })
        console.log(this.state.listBook)
    }

    dislike() {
        if (this.state.listBook[this.state.currentBookId].idBook !== undefined) {
            BookHelpers.dislikeBook(this.state.listBook[this.state.currentBookId].idBook, this.state.currentUserId).then(res => {
                this.setState({currentBookId: this.state.currentBookId + 1})
                console.log("Book disliked");
            })
        }
        if(this.state.currentBookId === this.state.criticalSize){
            UserHelpers.getTL(this.state.currentUserId).then(result => {
                this.setState({
                    listBook: [this.state.listBook[this.state.listBook.length-1], ...result.data],
                    currentBookId: 0
                })
            })
        }
        UserHelpers.getUserById(this.state.currentUserId).then(async res => {
            if(res.data.genres !== null){
                const genreList = res.data.genres
                if(genreList !== undefined){
                    const newGenre = Object.entries(genreList)
                    this.setState({genres: newGenre})
                }
            }
        })
        console.log(this.state.listBook)
    }

    render() {
        let page
        if (this.state.listBook[this.state.currentBookId] !== undefined) {
            page = <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="space-evenly" style={{width:"100%"}}>
                        <Grid item xs>
                            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
                                <Form title={"Selection"}>
                                    <BookCard bookImg={this.state.listBook[this.state.currentBookId].imageBook}
                                              bookName={this.state.listBook[this.state.currentBookId].titleBook}
                                              bookSummary={this.state.listBook[this.state.currentBookId].summaryBook}/>
                                </Form>
                            </Slide>
                            <Grid xs={12}
                                  container
                                  direction="row"
                                  justify="space-evenly"
                                  alignItems="center">
                                <IconButton size="medium" onClick={this.dislike}>
                                    <ThumbDownIcon style={{fontSize: 40, color: colors.red}}/>
                                </IconButton>
                                <IconButton size="medium" onClick={this.like}>
                                    <FavoriteIcon style={{fontSize: 40, color: colors.green}}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <Container maxWidth="xs" id="nav-bar" >
                                <Grid
                                    container
                                    direction ="column"
                                    alignItems="center"
                                >
                                    {this.state.genres.length !== 0 ? (
                                        this.state.genres.map((genre: any) =>
                                            <Grid
                                                container
                                                direction="row"
                                                alignItems="center"
                                                justify="center"
                                                style={{width:"100%", backgroundColor:"#c3afcf", margin: "0.40em"}}>
                                                <div>{(genre[0].substring(0, 4) === "Homo" ? "Homosexualité": genre[0])} : {genre[1]}</div>
                                            </Grid>
                                        )
                                    ) : (
                                        <Grid container
                                              direction="row"
                                              justify="center"
                                              alignItems="center"
                                              style={{margin:"10% 0 10% 0"}}>
                                            <CircularProgress size={100}/>
                                        </Grid>
                                    )}
                                </Grid>
                            </Container>
                        </Grid>
            </Grid>
        }


        return (
            <PageWithNav selected = {1}>
                {(!this.state.isLoading)
                    ? page
                    : <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            style={{margin:"10% 0 10% 0"}}>
                        <CircularProgress size={100}/>
                    </Grid>
                }
            </PageWithNav>
        );
    }
}

export default ConnectedHomePage;