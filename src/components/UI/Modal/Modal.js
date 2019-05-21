import React, {Component} from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props.show || nextProps.children !== this.props.children
    }

    render(){
        return (
            <Aux>
                <Backdrop show = {this.props.show} clicked = {this.props.ordered}/>
                <div className={classes.Modal}
                style = {{
                    transform: this.props.show ? 'translateY(0)' : 'translate(100vh)',
                    opacity: this.props.show ? '1' : '0'
                    }}
                    >
                    {this.props.children}
                </div>    
            </Aux>
        )
    }
}

export default Modal;