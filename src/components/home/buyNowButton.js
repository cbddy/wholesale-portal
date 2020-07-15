import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import loading from "../../resources/images/loading.svg"

const mapStateToProps = (state) => ({
    state: state.reducer,
});

class BuyNowButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    isEmpty = (obj) => {
        console.log("checking if is empty")
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    createNewOrder = () => {
        console.log("create new order");
        const data = {
            productID: this.props.product._id
        }
        axios
            .post("orders/newOrder/" + this.props.product._id)
            .then(res => {
                this.props.dispatch({ type: 'ADD_ORDER', payload: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addToOrder = () => {
        console.log("add to order")
        const data = {
            productID: this.props.product._id
        }
        axios
            .post("orders/addProduct/" + this.props.state.order._id, data)
            .then(res => {
                this.setState({
                    loading: false
                })
                this.props.dispatch({ type: 'ADD_ORDER', payload: res.data });
            })
            .catch((err) => {
                this.setState({
                    loading: false
                })
                console.log("error" + err);
            });
    }

    addToCart = () => {
        this.setState({
            loading: true
        })
        //if there isn't an open cart, create one with the new item
        console.log("order: " + this.props.state.order);
        if (this.isEmpty(this.props.state.order))
            this.createNewOrder();
        else {
            this.addToOrder();
        }
    }

    render() {
        if (this.state.loading) {
            return <img src = {loading}/>
        }
        else {
            return (
                <div className="product_buy"
                     onClick={this.addToCart}>
                    Buy Now {this.props.product.price}
                </div>
            );
        }
    }
}
export default connect(mapStateToProps)(BuyNowButton);