import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

/*components*/
import OrderCard from "./orderCard";

const mapStateToProps = (state) => ({
  state: state.reducer,
});

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  isEmpty = (obj) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  componentDidMount() {
    //get last open cart from db
    axios
        .get("orders/openOrder")
        .then(res => {
          if (res.data.order)
          {
            this.props.dispatch({ type: 'ADD_ORDER', payload: res.data.order });
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }

  displayProducts = () => {
    const products = this.props.state.order.products;
    console.log(products);
    return products.map(product => {
      return <OrderCard product = {product}/>
    })
  }

  render() {
    return (
        <div className="cart">
          <h1>cart</h1>
          {(() => {
            //if cart is empty
            if(this.isEmpty(this.props.state.order))
            {
              return <b>Your cart is empty! =( </b>
            }
            else {
              return (
                  <div>
                    {this.displayProducts()}
                  </div>
              )
            }
          })()}
        </div>
    );
  }
}
export default connect(mapStateToProps)(Cart);