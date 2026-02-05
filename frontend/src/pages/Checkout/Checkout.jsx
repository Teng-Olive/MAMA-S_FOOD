import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import razorpay from "../../assets/razorpay_logo.png";
// MoMO: replacing Stripe option with MoMO money (no image asset required)
import CartTotal from '../../components/CartTotal/CartTotal'
import './Checkout.css'
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";

const Checkout = () => {

    // State to manage the selected payment method (default: "cash on delivery" - "cod")
  const [method, setMethod] = useState("cod")
  // Extracting necessary values and functions from ShopContext
  const { cartItems, setCartItems, getCartAmount, delivery_fee, products, token, navigate } =
    useContext(ShopContext);


     // State to manage form input data for shipping details
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    state: "",
    phone: "",
  });

   // Handles changes in input fields and updates formData state
  const onChangeHandler = (event) => {
    // Extract the name attribute of the input field that triggered the event
    const name = event.target.name;
    // Extract the current value of the input field
    const value = event.target.value;

    // Update the state (formData) while preserving existing values
    setFormData((data) => ({ 
      // Keep the previous form data
      ...data, [name]: value })); // Update only the field that changed
  };

   // Handles form submission
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior

    try {
      let orderItems = [];

       // Looping through cartItems to extract product details
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
             // Finding the product details from products list
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );

            if (itemInfo) {
              itemInfo.size = item; // Assigning the selected size
              itemInfo.quantity = cartItems[items][item]; // Assigning quantity
              orderItems.push(itemInfo); // Adding to orderItems array
            }
          }
        }
      }

      // Creating the order object to send to backend
      let orderData = {
        address: formData, // Shipping address
        items: orderItems,  // List of ordered products
        amount: getCartAmount() + delivery_fee,  // Total order amount including delivery fee
      };

            // Handling different payment methods
      switch (method) {
        case "cod":
            // Sending order details to backend for Cash on Delivery (COD) orders
          const response = await axios.post(
          backendUrl + '/api/order/place',
            orderData,
            { headers: { token } }  // Sending authentication token
          );
          // console.log(response.data);
          if(response.data.success){
            setCartItems({}) // Clearing cart after successful order placement
            navigate("/orders") // Redirecting to orders page
          }
          else{
            toast.error(response.data.message)
          }
          
          break;

          case 'momo':
            // Sending order details to backend for MoMO payment (mobile money)
            const responseMoMo = await axios.post(backendUrl + '/api/order/momo',
              orderData, { headers: {token}}
            )
            if (responseMoMo.data.success) {
              // backend may return payment instructions (phone, amount, orderId)
              const { paymentInstructions } = responseMoMo.data;
              setCartItems({}) // Clear cart; payment verification can run later
              toast.success(responseMoMo.data.message || 'Order placed. Please complete payment via MoMO.');
              if (paymentInstructions) {
                toast.info(`MoMO: ${paymentInstructions.phone} — ${paymentInstructions.message}`, { autoClose: 8000 });
                console.log('MoMO instructions:', paymentInstructions);
              }
              navigate('/orders')
            } else {
              toast.error(responseMoMo.data.message)
            }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form className="form-container" onSubmit={onSubmitHandler}>
      {/* Delivery information section */}
      <div className="form-left">
        <fieldset className="payment-method">
          <legend>Payment Options</legend>
          <div className="payment-options">
            <div
            // MoMO option: sets payment method to "momo"
            onClick={()=> setMethod("momo")}
            // Applies the "selected" class if "momo" is the currently selected payment method
             className={`payment-option ${method === "momo" ? "selected" : ""}`}>
             {/* Displays MoMO label */}
              <div className="payment-momo">MoMO MONEY</div>
            </div>
            {/* <div onClick={()=> setMethod("razorpay")}
             className={`payment-option ${method === "razorpay" ? "selected" : ""}`}>
              <img src={razorpay} alt="" className="payment-logo" />
            </div> */}
            <div onClick={()=> setMethod("cod")}
             className={`payment-option ${method === "cod" ? "selected" : ""}`}>
              <span className="payment-text">CASH ON DELIVERY</span>
            </div>
          </div>
        </fieldset>

        <div className="form-title">
          <h2>Shipping Address</h2>
        </div>
        <div className="form-row">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            className="form-input"
            placeholder="First Name"
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            className="form-input"
            placeholder="Last Name"
            onChange={onChangeHandler}
          />
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          className="form-input"
          placeholder="Email Address"
          onChange={onChangeHandler}
        />
        <input
          type="phone"
          name="phone"
          value={formData.phone}
          className="form-input"
          placeholder="Phone Number"
          onChange={onChangeHandler}
        />
        <input
          type="text"
          name="street"
          value={formData.street}
          className="form-input"
          placeholder="Street Address"
          onChange={onChangeHandler}
        />
        <div className="form-row">
          <input
            type="text"
            name="city"
            value={formData.city}
            className="form-input"
            placeholder="City"
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="state"
            value={formData.state}
            className="form-input"
            placeholder="State"
            onChange={onChangeHandler}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            className="form-input"
            placeholder="Zipcode"
            onChange={onChangeHandler}
          />
          <input
            type="text"
            name="country"
            value={formData.country}
            className="form-input"
            placeholder="Country"
            onChange={onChangeHandler}
          />
        </div>
      </div>
      {/* Payment/Summary Section */}
      <div className="form-right">
        <CartTotal />

        <div className="form-submit">
            <button type="submit" className="submit-button"> PLACE ORDER</button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
