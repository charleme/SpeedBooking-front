import React from 'react';
import Container from "@material-ui/core/Container";
import { Button, Grid } from "@material-ui/core";
import ConnectionForm from './ConnectionForm';

export default class Connection extends React.Component<any, any> {
    constructor(props:any){
        super(props);
    }

    render() {
        return (
            <ConnectionForm/>
        );
    }
}