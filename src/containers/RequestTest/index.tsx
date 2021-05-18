import { Button, Container, Typography } from '@material-ui/core';
import { AxiosResponse } from 'axios';
import React, {Component} from 'react';
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

    launchRequest =async () => {
        const component = this;

        request(5).then(function (response){
            // const jsxResponse: JSX.Element = ( 
            //             <div>
            //                 <div>
            //                     Statut: {response.status} : {response.statusText}
            //                 </div>
            //                 <div>
            //                     Response: {JSON.stringify(response.data)}
            //                 </div>
            //             </div>);

            console.log(response);
            // component.setState({requestResponse : jsxResponse})
        }).catch(function(error: any){
            console.error(error);
        });
    } 

    render() {
        return (
            <Container>
                <Button onClick={this.launchRequest} variant="contained" color="primary">
                    Launch request
                </Button>
                <Typography variant="h5">
                    To test a request edit request constant value (l10) and request parameter (l22)
                </Typography>
                <Typography variant="h6">
                    {this.state.requestResponse}
                </Typography>
            </Container>
        );
    }
}

export default RequestTest;