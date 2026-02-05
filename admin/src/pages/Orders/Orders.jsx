import React from "react";
import { useState } from "react";
import { backendUrl, currency } from "../../App";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import './Orders.css'

const Orders = ({ token }) => {
  // useState hook to store orders fetched from the backend
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders from the backend
  const fetchAllOrders = async () => {
    // If there is no authentication token, return early
    if (!token) {
      return null;
    }

    try {
      // If there is no authentication token, return early
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } } // Sending token in headers for authentication
      );
      console.log(response.data);
      // If API call is successful, update the orders state
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to update the order status when an admin changes it
  const statusHandler = async (event, orderId) => {
    try {
      // Sending a POST request to update the order status
      const response = await axios.post(
        backendUrl + "/api/order/status", 
        { orderId, status: event.target.value }, // Sending orderId and new status
        { headers: { token } } // Sending authentication token
      );
      // If status update is successful, fetch updated orders
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
  };

  // useEffect hook to fetch all orders when the component mounts or when the token changes
  useEffect(() => {
    fetchAllOrders();
  }, [token]); // Dependency array ensures fetchAllOrders runs when token changes

  return (
    <div>
      <h3 className="order-title">All Orders</h3>
      <div className="order-container">
  <table className="order-table">
    <thead>
      <tr>
        <th>Customer</th>
        <th>Email</th>
        <th>Telephone</th>
        <th>Shipping Address</th>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Items</th>
        <th>Price</th>
        <th>Payment Method</th>
        <th>Payment</th>
        <th>Date</th>
        <th>Delivery Status</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((order, index) => (
        <tr key={index}>
          <td>{order.address.firstName} {order.address.lastName}</td>
          <td>{order.address.email} </td>
          <td>{order.address.phone}</td>
          <td>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</td>
          <td>
            {order.items.map((item, i) => (
              <p key={i}>{item.name}</p>
            ))}
          </td>
          <td>
            {order.items.map((item, i) => (
              <p key={i}>{item.quantity}</p>
            ))}
          </td>
          <td>{order.items.length}</td>
          <td>{currency} {order.amount}</td>
          <td>{order.paymentMethod}</td>
          <td>{order.payment ? "Done" : "Pending"}</td>
          <td>{new Date(order.date).toLocaleString()}</td>
          <td>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="order-status">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Orders;
