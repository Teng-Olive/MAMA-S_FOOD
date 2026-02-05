import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {BiUser, BiCart} from 'react-icons/bi'
import {FaCentos} from 'react-icons/fa'
import './Navbar.css'
import { ShopContext } from '../../context/ShopContext'


const Navbar = () => {

    // State to manage loading animation
    const [loading, setLoading] = useState(false)
    // Extracting necessary functions and values from ShopContext
    const {updateSearchTerm, getCartCount, token, setToken} = useContext(ShopContext)

    // Function to handle user logout
    const logout = () => {
        navigate("/login"); // Redirects to login page
        localStorage.removeItem("token") // Removes authentication token from local storage
        setToken(""); // Clears the token from state
    }

    // Hook for navigating to different routes
    const navigate = useNavigate();

        // Function to handle navigation with a loading animation
    const handleNavigation = (path) => {
        // Sets loading to true
        setLoading(true);
        // Disables loading after 2 seconds
        setTimeout(()=>{
            setLoading(false)
        },2000)
        navigate(path)
    }

    const [searchInput, setSearchInput] = useState('')

    const handleSearch = () => {
        updateSearchTerm(searchInput);
    }

  return (
    <div>
        {/* Displays a loading spinner when loading state is true */}
        {loading && (
        <div className="loader-container">
          <div className="loader">
            <FaCentos className="loader-icon" />{" "}
          </div>
        </div>
      )}
      <nav className="navbar">
        <div className="nav-top">
          <Link to="/">
            <h2>Mama's Delight Kitchen</h2>
          </Link>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Search for products ....."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch} className="search-btn">
              SEARCH
            </button>
          </div>
          <div className="icons">
            <div className="profile-group">
              <BiUser className="icon" />
              <div className="dropdown-menu">
                <Link to="/login">
                  <p className="dropdown-item">Login/Sign Up</p>
                </Link>
                <Link to="/orders">
                  <p className="dropdown-item"> Orders</p>
                </Link>
                <p className="dropdown-item" onClick={logout}>
                  Logout
                </p>
                
              </div>
            </div>
            <button
              className="cart-icon"
              onClick={() => handleNavigation("/cart")}
            >
              <BiCart className="icon" />
              <span className="cart-count">{getCartCount()}</span>
            </button>
          </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar