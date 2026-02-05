import React, { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext'
import './CartTotal.css'

const CartTotal = () => {
    const { currency, getCartAmount, delivery_fee} = useContext(ShopContext)
  return (
    <div>
        <div className="cart-total-container">
            <div className="cart-title">
                <h2>CART TOTALS</h2>
            </div>
            <div className="cart-details">
                <div className="cart-row">
                    <p>Subtotal</p>
                    <p><span style={{fontSize: '0.7em'}}>{currency}</span> {getCartAmount()}</p>
                </div>
                <hr className="cart-divider" />
                <div className="cart-row">
                    <p>Shipping Fee</p>
                    <p><span style={{fontSize: '0.7em'}}>{currency}</span> {delivery_fee}</p>
                </div>
                <div className="cart-row cart-total">
                    <b>Total</b>
                    <b><span style={{fontSize: '0.7em'}}>{currency}</span> {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartTotal