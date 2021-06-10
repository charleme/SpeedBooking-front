import React, { Component } from "react";
import {CircularProgress, Container, Grid} from "@material-ui/core";
import UserHelpers from "../../helpers/UserHelpers";
import IGenre from "../../data_interface/IGenre";
import "../../containers/ConnectedHomePage/Counter.scss"

interface IState{
    genres?: any
}

class Counter extends Component<any, IState> {
    constructor(props: any){
        super(props);
        this.state={
            genres: []
        }

    }

    componentDidMount() {
        const currentUserId:number|null  = (localStorage.getItem("id") !== null) ? Number(localStorage.getItem("id")) : null ;
        if(currentUserId !== null){
            UserHelpers.getUserById(currentUserId).then(async res => {
                if(res.data.genres !== null){
                    const genreList = res.data.genres
                    if(genreList !== undefined){
                        const newGenre = Object.entries(genreList)
                        this.setState({genres: newGenre})
                        // for(const property in genreList){
                        //     newGenre.push([property, genreList[property]])
                        // }
                        console.log(this.state.genres)
                    }
                }
            })
        }
        // console.log(this.state.genres)
    }


    render() {
        return (
            <div></div>
        );
    }
}

export default Counter;