import React, {Component} from 'react'
import NavBar from '../../components/NavBar/NavBar';
import PageWithNav from '../../components/NavBar/PageWithNav';

class SettingsPage extends Component<any, any> {
    constructor(props:any) {
        super(props);
    }
    render() {
        return (
            <PageWithNav selected={4}>
                <div>
                    SettingsPage
                </div>
            </PageWithNav>
        );
    }
}

export default SettingsPage;