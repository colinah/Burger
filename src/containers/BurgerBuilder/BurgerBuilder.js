// eslint-disable-next-line react/no-typos
import React , { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.6,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: null,
        totalPrice : 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-4797a.firebaseio.com/ingredients.json')
            .then(response => this.setState({ingredients: response.data}))
            .catch(error => {
                this.setState({error:true})
            })
        
    }

    updatePurchase = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0);

            this.setState({purchasable: sum > 0 ? true : false})

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount;
        const updateTotalPrice =  this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: updateTotalPrice, ingredients: updatedIngredients})
        this.updatePurchase(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if(oldCount === 0){
            this.updatePurchase();
            return
        }
        const updatedCount = oldCount  - 1;
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount;
        const updateTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: updateTotalPrice, ingredients: updatedIngredients})
        this.updatePurchase(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: !this.state.purchasing})

    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Colin Hale',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '84601',
                    country: 'USA'

                },
                email: 'TestEmail@gmail.com',
                deliveryMethod: 'fastest'

            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false})
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false})
            });
        this.setState({purchasing: !this.state.purchasing})
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        let orderSummary = null;

        if(this.state.loading){
            orderSummary = <Spinner />
        }
        let burger = this.state.error ? <p>Ingredients cant be loaded, network error. </p> : <Spinner />

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        purchasable = {this.state.purchasable}
                        disabled = {disabledInfo} 
                        price = {this.state.totalPrice} 
                        ordered = {this.purchaseHandler} />
                </Aux>
                )
            orderSummary = <OrderSummary 
                ingredients = {this.state.ingredients}
                ordered = {this.purchaseHandler}
                purchaseContinue = {this.purchaseContinueHandler}
                totalPrice = {this.state.totalPrice} />
        } 
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show = {this.state.purchasing}
                    ordered = {this.purchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);