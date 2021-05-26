import React, {Component} from 'react'
import NavBar from '../../components/NavBar/NavBar';
import PageWithNav from '../../components/NavBar/PageWithNav';
import Profil from '../../components/Profil/Profil';

class ProfilePage extends Component<any, any> {
    constructor(props:any) {
        super(props);
    }
    render() {
        return (
            <PageWithNav selected={2}>
                <Profil/>
            </PageWithNav>
        );
    }
}

export default ProfilePage;