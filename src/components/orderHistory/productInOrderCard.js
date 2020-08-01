import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import blank_image from '../../resources/images/blank_image.jpg'
import { compose } from 'redux'
import {getPriceByQuantity} from "../reuseable/getPriceByQuantity";

const mapStateToProps = state => ({
  state: state.reducer
})

class ProductInOrderCard extends React.Component {
  goToProduct = e => {
    const redirect_url = '/product/' + this.props.productInfo._id.toString()
    e.stopPropagation()
    this.props.history.push(redirect_url)
  }

  render () {
    const image = this.props.productInfo.imageData
      ? this.props.productInfo.imageData[0].url
      : blank_image

    const productLink = '/product/' + this.props.productInfo._id.toString()

    return (
      <Link to={productLink} title='go to product'>
        <div className='order_details_card'>
          <div className='order_details_card_image_container'>
            <img
              className='order_details_card_image'
              src={image}
              alt='product_image'
            />
          </div>
          <div className='order_card_contents'>
            <div className='order_content'>
              <div className='order_card_product_name'>
                {this.props.productInfo.name}
              </div>
              <div className='order_card_id'>#{this.props.productInfo._id}</div>
            </div>

            <div className='product_in_order_card_values'>
              <div>${this.props.productInfo.price}</div>
              <div className='product_in_order_card_quantity'>
                {this.props.quantity}
              </div>
              {(() => {
                const total = getPriceByQuantity(this.props.productInfo.priceTiers, this.props.quantity, this.props.productInfo.price)
                return (
                  <div className='product_in_order_card_total'>${total}</div>
                )
              })()}
            </div>
          </div>
        </div>
      </Link>
    )
  }
}

export default compose(withRouter, connect(mapStateToProps))(ProductInOrderCard)
