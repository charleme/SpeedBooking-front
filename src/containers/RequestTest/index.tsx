import { Button, Container, Typography } from '@material-ui/core';
import React, {Component} from 'react';
import IBook, {mockBook} from '../../data_interface/IBook';
import IUser, {mockUser} from '../../data_interface/IUser';
import BookHelpers from '../../helpers/BookHelpers';
import UserHelpers from '../../helpers/UserHelpers';

export interface IState{
    requestResponse:  JSX.Element;
}

const request = UserHelpers.deleteUser;

class RequestTest extends Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {requestResponse:<></>};
        
        this.launchRequest.bind(this);
    }

    launchRequest = (e: any) => {
        e.preventDefault()
        const component = this;

        UserHelpers.getUserReadBooks(1).then(function (response){
            const jsxResponse: JSX.Element = ( 
                        <div>
                            <div>
                                <strong>Status : </strong><span style={{color:"#00DD00"}}>{response.status}</span> : {response.statusText}
                            </div>
                            <div>
                                <strong>Response : </strong>{JSON.stringify(response.data)}
                            </div>
                        </div>);

            console.log(response);
            component.setState({requestResponse : jsxResponse})
        }).catch(function(error: any){
            const jsxResponse: JSX.Element = ( 
                <div>
                    <div>
                        <span style={{color:"#DD0000"}}>Error</span>
                    </div>
                    <div>
                        <strong>Message :</strong> {error.message}
                    </div>
                    <div>
                        <strong>Stack :</strong> {error.stack}
                    </div>
                </div>);
            component.setState({requestResponse : jsxResponse})
            console.error(error);
        });
    } 

    render() {
        return (
            <Container>
                <Typography variant="h2">
                    Request test
                </Typography>
                <Button onClick={this.launchRequest} variant="contained" color="primary">
                    Launch request
                </Button>
                
                <Typography variant="h6">
                    {this.state.requestResponse}
                </Typography>
            </Container>
        );
    }
}

export default RequestTest;