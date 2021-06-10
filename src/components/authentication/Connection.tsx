import React from 'react';
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