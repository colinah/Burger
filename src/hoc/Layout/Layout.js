// eslint-disable-next-line react/no-typos
import React , { Component }from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }
    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true});
    }
    render() {
        return (  
            <Aux>
                <Toolbar open = {this.sideDrawerOpenHandler} />
                <SideDrawer 
                    closed = {this.sideDrawerCloseHandler}
                    open = {this.state.showSideDrawer} />
                <div>Toolbar Sidebar, Backdrop</div>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} ;

export default Layout;