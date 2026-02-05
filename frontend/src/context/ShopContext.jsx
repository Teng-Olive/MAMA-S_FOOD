import { createContext, useState, useEffect } from "react";
import {product} from '../assets/assets'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { backendUrl } from "../App";

export const ShopContext = createContext()

const ShopContextProvider =({children}) => {

    const currency = 'FCFA';
    const delivery_fee = 12;
    console.log(backendUrl);

    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState(product);
    const [searchTerm, setSearchTerm] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    const updateSearchTerm = (term) => {
        setSearchTerm(term);
    };

    const addToCart = async (itemId) => {
        // Create a copy of the current cart items to avoid directly mutating the state
        const updatedCart = { ...cartItems };
        // If the item already exists in the cart, increase its quantity by 1; otherwise, set it to 1
        updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
            // Update the cart state with the new cart data
        setCartItems(updatedCart);
        console.log(`Product added to cart: Item ID - ${itemId}, Current Cart:`, updatedCart);
         // Display a success message to the user
        toast.success(`Added product to the cart!`);

        // If the user is authenticated (has a token), sync the cart update with the backend
        if (token) {
            try {
                 // Send a request to the backend to update the cart in the database
                await axios.post(`${backendUrl}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                // Show an error message to the user if the request fails
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // Function to get the total count of items in the cart
    const getCartCount = () => {
         // Extracts all item quantities from the cart and sums them up
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    };

    // Function to update the quantity of a specific item in the cart
    const updateQuantity = async (itemId, quantity) => {
         // Create a copy of the current cart items to avoid direct mutation of state
        let cartData = { ...cartItems };
            // Update the quantity of the specified item in the cart
        cartData[itemId] = quantity;
         // Update the cart state with the new data
        setCartItems(cartData);

        // If the user is authenticated (has a token), sync the cart update with the backend
        if (token) {
            try {
                // Send a request to update the cart on the backend
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    // Function to calculate the total price of items in the cart
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((totalAmount, [itemId, quantity]) => {
             // Find the product details using the itemId from the products array
            const itemInfo = products.find((product) => product._id === itemId);
             // If the product is found, add its price multiplied by quantity to the total amount
            return itemInfo ? totalAmount + itemInfo.price * quantity : totalAmount;
        }, 0); // Start the totalAmount from 0
    };

    // Function to fetch product data from the backend
    const getProductsData = async () => {
        try {
            // Send a GET request to fetch the product list from the backend
            const response = await axios.get(`${backendUrl}/api/product/list`);
            console.log(response.data);

             // If the request is successful, update the products state with the fetched data
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                 // Display an error message if the API response indicates failure
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // Function to fetch the user's cart data from the backend
    const getUserCart = async (token) => {
        try {
             // Sending a POST request to get the cart data, passing the token in the headers for authentication
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });

        // If the request is successful, update the cartItems state with the received cart data
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    // useEffect hook to fetch product data when the component mounts
    useEffect(() => {
        getProductsData();  // Calls the function to fetch and set product data
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    // useEffect hook to check for an existing user token and fetch the user's cart data
    useEffect(() => {
         // If no token is present in state but one exists in local storage, use it
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token')); // Set the token state
            getUserCart(localStorage.getItem('token')); // Fetch the cart data using the stored token
        }
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    const value = {
        products,
        currency,
        delivery_fee,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,
        setCartItems,
        searchTerm,
        updateSearchTerm
    };

    return (
        <ShopContext.Provider value={value} >
            {children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;