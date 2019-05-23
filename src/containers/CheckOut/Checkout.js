import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {
    state = {
        ingredients: {
            bacon: 0,
            cheese: 0,
            salad: 0,
            meat: 0
        }
    };
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let param of query.entries()){
            ingredients[param[0]] = +param[1]
        }
        console.log(ingredients)
        this.setState({ingredients:ingredients})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');

    }
    render(){
        return(
            <div>
                <CheckoutSummary  
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued = {this.checkoutContinuedHandler}
                    ingredients = {this.state.ingredients} />
            </div>
        )
    }
}

export default Checkout;