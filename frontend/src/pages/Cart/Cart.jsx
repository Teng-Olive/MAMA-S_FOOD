import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { MdDelete } from 'react-icons/md'
import { toast } from 'react-toastify'
import CartTotal from '../../components/CartTotal/CartTotal'
import './Cart.css'

const Cart = () => {

  // Extracting necessary values and functions from ShopContext
  const {products, currency, cartItems, updateQuantity, navigate, token } = useContext(ShopContext)

    // State to store transformed cart data
  const [cartData, setCartData] = useState([])

    // useEffect hook to update cart data whenever cartItems or products change
  useEffect(() => {
    // If no products exist, do nothing
    if (products.length === 0) return;

    if (!cartItems || typeof cartItems !== "object") {
      // If cartItems is not valid, set cartData to an empty array
      setCartData([]);
      return;
    }

    // Convert cartItems object into an array of items with ID and quantit
    const tempData = Object.entries(cartItems)
      .filter(([, quantity]) => quantity > 0) // Filter out items with zero quantity
      .map(([itemId, quantity]) => ({
        // Assign product ID
        id: itemId,
        // Assign quantity
        quantity,
      }));

      // Update state with transformed cart data
    setCartData(tempData);
  }, [cartItems, products]); // Dependency array ensures this runs when cartItems or products change



  const handleProceedToCheckout = () => {
    if (!token) {
      toast.info("Please log in or sign up to proceed to checkout.");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div>
      <div>
        <h2>Cart Items</h2>
      </div>
      <div className="cart-content-container">
        {
          cartData.map((item, index) => {
            // Finding the product details using product ID
            const productData = products.find(product=> product.id === item.id)
            if (!productData) {
              return null
            }
            return (
              <div key={index} className='cart-item'>
                <div className="cart-item-info">
                  <img src={productData.image} alt="" className='product-cart-image' />
                  <div className="product-details-cart">
                    <p className="cart-product-name">{productData.name} </p>
                    <div className="product-price-size">
                      <p className='cart-product-price'>{productData.price} <span style={{fontSize: '0.7em'}}>{currency}</span></p>
                    </div>
                  </div>
                </div>

                <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(item.id, Number(e.target.value)) // Updates quantity when changed
                }
                className="quantity-input"
                type="number"
                min={1} // Minimum quantity allowed is 1
                defaultValue={item.quantity}  // Sets initial value to item's current quantity
              />

                <MdDelete className='delete-icon' onClick={()=> updateQuantity(item.id, 0)}/>
              </div>
            )
          })
        }
      </div>
      <div className="checkout-container">
        <div className="checkout-box">
          <CartTotal />
          <div className="checkout-button-container">
            <button onClick={handleProceedToCheckout} className="checkout-button">PROCCED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart