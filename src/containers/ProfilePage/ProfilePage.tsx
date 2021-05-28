import React, {Component} from 'react'
import NavBar from '../../components/NavBar/NavBar';
import PageWithNav from '../../components/NavBar/PageWithNav';
import Profile from '../../components/Profile/Profile';

class ProfilePage extends Component<any, any> {
    constructor(props:any) {
        super(props);
    }
    render() {
        return (
            <PageWithNav selected={2}>
                <Profile/>
            </PageWithNav>
        );
    }
}

export default ProfilePage;