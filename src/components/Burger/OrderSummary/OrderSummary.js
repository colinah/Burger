import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component  {
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key = {igKey}>
                        <span style = {{textTransform : "capitalize"}}>{igKey}</span> : {this.props.ingredients[igKey]} 
                    </li>)
        } );
        return(
            <Aux>
            <span style = {{
                float : 'right',
                borderStyle : 'none',
                userSelect: 'none'
                    }}
                onClick = {this.props.ordered}>
                {'\u2715'}
            </span>
            <h3>Your Order</h3>
            <p>A delicious burger contains the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType = "Danger" clicked = {this.props.ordered}>CANCLE</Button>
            <Button btnType = "Success" clicked = {this.props.purchaseContinue} > CONTINUE</Button>
        </Aux>
        )
    }
}

export default OrderSummary;