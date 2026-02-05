import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { backendUrl } from '../../App'
import axios from 'axios'
import './Order.css'

const Order = () => {

    // Access token and currency from ShopContext
    const { token, currency} = useContext(ShopContext)

    // State to store order data
    const [orderData, setOrderData] = useState([])
    

     // Function to load order data from backend
    const loadOrderData = async () => {
        try {
            // If no token, exit function
            if(!token){
                return null
            }

             // Send request to fetch user's orders
            const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers:{token}})
            // console.log(response.data)
            if(response.data.success){
                let allOrdersItem = []

                // Loop through each order and extract individual items
                response.data.orders.map((order) => {
                    order.items.map((item)=> {
                        // Add order details to each item
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;

                        allOrdersItem.push(item)
                    })
                })
                console.log(response.data);
                // Reverse the order to show most recent first and update state
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.log(error);
            
            
        }
    }

    // Fetch order data whenever token changes    
    useEffect(()=> {
        loadOrderData()
    },[token])
    
  
  return (
    <div>
        <div className="orders-container">
            <div className="order-title">
                <h1>My Orders</h1>
            </div>
            <div>
                {
                    orderData.map((item, index) => (
                        <div key={index} className='order-item-container'>
                            <div className="order-item-details">
                                <img src={item.image} className='order-item-image' alt="" />
                                <div>
                                    <p className="order-item-name">{item.name} </p>
                                    <div className="order-item-info">
                                        <p>{currency}{item.price} </p>
                                        <p>Quantity: {item.quantity} </p>
                                    </div>
                                    <p className='order-item-date'> Date: <span>{new Date(item.date).toLocaleString()}</span></p>
                                    <p className='order-item-payment'>Payment: <span>{item.paymentMethod} </span> </p>
                                </div>
                            </div>
                            <div className="order-item-status-container">
                                <div className="order-item-status">
                                    <p className='status-indicator'></p>
                                    <p>{item.status} </p>
                                </div>
                                <button onClick={loadOrderData} className="track-order-btn"> Track Order</button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Order