import { Button, Container, Typography } from '@material-ui/core';
import React, {Component} from 'react';
import IBook from '../../data_interface/IBook';
import IUser from '../../data_interface/IUser';
import AuthentificationHelpers from '../../helpers/AuthentificationHelpers';
import BookHelpers from '../../helpers/BookHelpers';
import UserHelpers from '../../helpers/UserHelpers';

export interface IState{
    requestResponse:  JSX.Element;
}

const fakeUser:IUser = {
    email:"fake@gmail.com",
    languages: "fr-FR",
    password: "test",
    username: "fakeName",
    genres: {"Angst": 30, "Crime": 70, "Drama": 88, "Humor": 80, "Quest": 48, "Family": 10, "Horror": 2, "Parody": 40, "Poetry": 95, "Sci-fi": 60, "Fantasy": 40, "Mystery": 50, "Romance": 120, "Tragedy": 13, "Western": 55, "Survival": 77, "Suspense": 67, "Adventure": 90, "Spiritual": 21, "Friendship": 60, "Hurt/Comfort": 20, "Supernatural": 49, "Homosexuality": 107},

} 

const fakeBook: IBook = {
    idBook: 10,
    titleBook: "FakeBook", 
    language: "test francais",
    imageBook: "https://m.testmedia-amazon.com/images/I/41gUSz1Cn2L.jpg",
    summaryBook: " test summary",
    firstChapter: "test test", 
    audienceTag: {"Angst": 70, "Crime": 77, "Drama": 88, "Humor": 86, "Quest": 133, "Family": 60, "Horror": 27, "Parody": 39, "Poetry": 65, "Sci-fiv": 15, "Fantasy": 20, "Mystery": 45, "Romance": 263, "Tragedy": 13, "Western": 55, "Survival": 84, "Suspense": 67, "Adventure": 30, "Spiritual": 27, "Friendship": 69, "Hurt/Comfort": 92, "Supernatural": 49, "Homosexuality": 107},
    links: {"testAmazon": "https://www.testamazon.fr/Outlaws-Lena-Shartiaud/dp/2375210794"},
    id_author: 2    
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

        UserHelpers.isUserPassword(12, "test").then(function (response){
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