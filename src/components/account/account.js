import React from "react";
import { connect } from "react-redux";
import FavoriteProductCard from './favoriteProductCard'

const mapStateToProps = state => ({
    state: state.reducer
})

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      favoriteProductList: this.props.state.favorites
    }
  }

  renderProduct = (favoriteProductList) => {
    const allProductsList = this.props.state.products.products;

    return allProductsList.map((product) => {
      if (favoriteProductList.indexOf(product._id) !== -1)
        {
          return (
          <FavoriteProductCard
          product={product}
          key={product._id}
          images={product.imageData}
          />
          )
        }
      })
  }


  render() {
    return (
      <div>
        <div className="page_header">Account</div>
        <div className="account_container">
        <div className="section_container" onClick={this.printPayments}>
            Order History
        </div>
        <div className="section_container">
        <div>Favorites</div>
        {this.renderProduct(this.props.state.favorites)}
        </div>
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Account);