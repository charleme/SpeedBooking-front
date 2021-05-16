import React from 'react';
import UserHelpers from "../../helpers/UserHelpers";

interface IState{
    id_user?: number;
    username: string;
    email: string;
    password: string;
    genres: string;
}

export default class UserList extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            genres: '',
        }
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeGenreHandler = this.changeGenreHandler.bind(this);
        this.saveUser = this.saveUser.bind(this);

    }
    changeUserNameHandler = (event: any) => {
        this.setState({username: event.target.value});
    }
    changeEmailHandler = (event: any) => {
        this.setState({email: event.target.value});
    }
    changePasswordHandler = (event: any) => {
        this.setState({password: event.target.value});
    }
    changeGenreHandler = (event: any) => {
        this.setState({genres: event.target.value});
    }
    saveUser = (e: any) => {
        e.preventDefault()
        let user = {username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    genre: this.state.genres};
        console.log("User =>" + JSON.stringify(user));
    }

    cancel (){
        this.props.history.push('/')
    }


    render() {
        return (
            <div>
                <form>
                    <label> Username : </label>
                    <input placeholder="Username" value={this.state.username} onChange={this.changeUserNameHandler}/>
                    <label> Email : </label>
                    <input placeholder="email" value={this.state.email} onChange={this.changeEmailHandler}/>
                    <label> Password : </label>
                    <input placeholder="password" value={this.state.password} onChange={this.changePasswordHandler}/>
                    <label> Genre : </label>
                    <input placeholder="genres" value={this.state.genres} onChange={this.changeGenreHandler}/>
                    <button onClick={this.saveUser}>Save</button>
                    <button onClick={this.cancel.bind(this)}>Cancel</button>
                </form>
            </div>
        );
    }
}
