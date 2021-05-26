import React, {Component} from 'react'
import NavBar from '../../components/NavBar/NavBar';
import PageWithNav from '../../components/NavBar/PageWithNav';

class LikedBookPage extends Component<any, any> {
    constructor(props:any) {
        super(props);
    }
    render() {
        return (
            <PageWithNav selected={3}>
                <div>
                    LikeBookPage
                </div>
            </PageWithNav>
        );
    }
}

export default LikedBookPage;