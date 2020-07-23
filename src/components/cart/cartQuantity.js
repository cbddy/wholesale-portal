import React from 'react'
import { connect } from 'react-redux'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const mapStateToProps = state => ({
  state: state.reducer
})

class CartQuantity extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      quantity: 0,
      active: false
    }
  }

  componentDidMount () {
    this.setState({
      quantity: this.props.productInfo.quantity
    })
  }

  addQuantity = event => {
    this.setState(
      {
        quantity: this.state.quantity + 1
      },
      () => {
        this.dispatchQuantity()
      }
    )
  }

  reduceQuantity = event => {
    this.setState(
      {
        quantity: this.state.quantity - 1
      },
      () => {
        this.dispatchQuantity()
      }
    )
  }

  inputQuantity = event => {
    this.setState({
      quantity: parseInt(event.target.value, 10)
    })
  }

  onBlur = () => {
    this.dispatchQuantity()
  }

  dispatchQuantity = () => {
    console.log(this.state)
    this.props.dispatch({
      type: 'UPDATE_CART_ITEM',
      payload: {
        id: this.props.productInfo.product,
        quantity: this.state.quantity
      }
    })
  }

  render () {
    const quantity = this.state.quantity ? this.state.quantity : ''
    return (
      <div className='cart_quantity'>
        <input
          // disabled={this.state.active ? '' : 'disabled'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.inputQuantity}
          className='product_quantity_input'
          value={quantity}
          type='number'
        />
        <div className='quantity_arrows'>
          <div
            className='order_quantity_button'
            name='reduce'
            onClick={this.addQuantity}
          >
            <ExpandLessIcon />
          </div>

          <div
            className='order_quantity_button'
            name='add'
            onClick={this.reduceQuantity}
          >
            <ExpandLessIcon className='icon_upsidedown' />
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(CartQuantity)
