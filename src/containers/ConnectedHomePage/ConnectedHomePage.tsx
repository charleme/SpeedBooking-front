import React, {Component} from "react"
import PageWithNav from "../../components/NavBar/PageWithNav";
import Form from "../../components/Form/Form";
import IBook from "../../data_interface/IBook";
import UserHelpers from "../../helpers/UserHelpers";
import {Grid, IconButton} from "@material-ui/core";
import {colors} from "../../default_color";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import UserBookHelpers from "../../helpers/UserBookHelpers";

interface IState {
    isLoading: boolean,
    listBook: IBook[],
    criticalSize: number,
    currentBookId: number,
    currentUserId: number,
}

class ConnectedHomePage extends Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            listBook: [],
            criticalSize: 0,
            currentBookId: 0,
            currentUserId: Number(localStorage.getItem("id"))

        }

        this.like = this.like.bind(this)
        this.dislike = this.dislike.bind(this)
    }

    componentDidMount() {
        if (this.state.currentUserId !== null){
            UserHelpers.getTL(this.state.currentUserId).then(res => {
                this.setState({
                        listBook: this.state.listBook.concat(res.data),
                        criticalSize: this.state.listBook.length - 1
                    })
                console.log(this.state.listBook)
                console.log(this.state.currentUserId)
                console.log(this.state.currentBookId)
            })
        }
    }

    like() {
        if(this.state.currentBookId === this.state.criticalSize && this.state.currentBookId !== undefined){

            UserBookHelpers.createUserBook(this.state.currentUserId, this.state.listBook[this.state.currentBookId].idBook).then(res =>{
                UserHelpers.getTL(this.state.currentUserId).then(res => {
                    this.setState({
                        listBook: this.state.listBook.concat(res.data)
                    })
                })
            })
        }
        this.setState({currentBookId: this.state.currentBookId+1})
    }

    dislike() {
        this.setState({currentBookId: this.state.currentBookId+1})
        if(this.state.currentBookId === this.state.criticalSize){

        }
    }

    render() {
        return (
            <PageWithNav selected = {1}>
                <Form title={"Selection"}>

                </Form>
                <Grid xs={12}
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center">
                        <IconButton size="medium" onClick={this.dislike}>
                            <ThumbDownIcon style={{ fontSize: 40, color:colors.red }}/>
                        </IconButton>
                        <IconButton size="medium" onClick={this.like}>
                            <FavoriteIcon style={{fontSize: 40, color:colors.green}}/>
                        </IconButton>
                </Grid>
            </PageWithNav>
        );
    }
}

export default ConnectedHomePage;