import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../../context/ShopContext";
import CartTotal from '../../components/CartTotal/CartTotal';
import './Checkout.css';
import axios from "axios";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";

const Checkout = () => {
    const [method, setMethod] = useState("cod");
    const { cartItems, setCartItems, getCartAmount, delivery_fee, products, token, navigate } =
        useContext(ShopContext);

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

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            let orderItems = [];

            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    const quantity = cartItems[itemId][size];
                    if (quantity > 0) {
                        const itemInfo = structuredClone(
                            products.find(product => product._id === itemId)
                        );

                        if (itemInfo) {
                            itemInfo.size = size;
                            itemInfo.quantity = quantity;
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
            };

            switch (method) {
                case "cod": {
                    const response = await axios.post(
                        `${backendUrl}/api/order/place`,
                        orderData,
                        { headers: { token } }
                    );
                    if (response.data.success) {
                        setCartItems({});
                        navigate("/orders");
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                }

                case "momo": {
                    const responseMoMo = await axios.post(
                        `${backendUrl}/api/order/momo`,
                        orderData,
                        { headers: { token } }
                    );
                    if (responseMoMo.data.success) {
                        const { paymentInstructions } = responseMoMo.data;
                        setCartItems({});
                        toast.success(responseMoMo.data.message || 'Order placed. Please complete payment via MoMO.');
                        if (paymentInstructions) {
                            toast.info(`MoMO: ${paymentInstructions.phone} — ${paymentInstructions.message}`, { autoClose: 8000 });
                            console.log('MoMO instructions:', paymentInstructions);
                        }
                        navigate('/orders');
                    } else {
                        toast.error(responseMoMo.data.message);
                    }
                    break;
                }

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        // Including token as a dependency
        // Your token-related logic here...
    }, [token]);

    return (
        <form className="form-container" onSubmit={onSubmitHandler}>
            <div className="form-left">
                <fieldset className="payment-method">
                    <legend>Payment Options</legend>
                    <div className="payment-options">
                        <div onClick={() => setMethod("momo")}
                            className={`payment-option ${method === "momo" ? "selected" : ""}`}>
                            <div className="payment-momo">MoMO MONEY</div>
                        </div>
                        <div onClick={() => setMethod("cod")}
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
                    type="tel"
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
            <div className="form-right">
                <CartTotal />
                <div className="form-submit">
                    <button type="submit" className="submit-button">PLACE ORDER</button>
                </div>
            </div>
        </form>
    );
};

export default Checkout;