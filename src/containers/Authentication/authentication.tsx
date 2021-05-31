import React from 'react';
import Container from "@material-ui/core/Container";
import ConnectionForm from './../../components/authentication/ConnectionForm';
import { Button, Grid } from "@material-ui/core";

export default class Authentication extends React.Component<any, any> {
    constructor(props:any){
        super(props);
    }

    render() {
        return (
            <ConnectionForm/>
        );
    };
}