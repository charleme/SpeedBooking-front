import {Component} from 'react'
import PageWithNav from '../../components/NavBar/PageWithNav';
import Profile from '../../components/Profile/Profile';

class ProfilePage extends Component<any, any> {
    render() {
        return (
            <PageWithNav selected={2}>
                <Profile/>
            </PageWithNav>
        );
    }
}

export default ProfilePage;