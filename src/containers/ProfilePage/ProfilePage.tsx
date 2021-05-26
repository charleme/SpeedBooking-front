import React, {Component} from 'react'
import NavBar from '../../components/NavBar/NavBar';
import PageWithNav from '../../components/NavBar/PageWithNav';

class ProfilePage extends Component<any, any> {
    constructor(props:any) {
        super(props);
    }
    render() {
        return (
            <PageWithNav selected={2}>
                <div>
                    Profil Page
                </div>
            </PageWithNav>
        );
    }
}

export default ProfilePage;