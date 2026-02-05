import React, { useState } from "react";
import './Login.css'
import axios from "axios"
import { backendUrl } from "../../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const OnSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      // Development bypass - remove this in production
      if(email === 'admin@test.com' && password === 'test123'){
        setToken('test_token_bypass')
        toast.success('Login successful (bypass mode)')
        return
      }

      const response = await axios.post(backendUrl + '/api/user/admin' , {email,password})
      console.log(response)

      if(response.data.success){
        setToken(response.data.token)
      }
      else{
        toast.error(response.data.message)
      }

      // console.log(email,password)
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }
  return (
    <div>
      <div className="admin-panel-container">
        <div className="admin-panel-box">
          <h1 className="login-title">Admin Panel</h1>
          <form onSubmit={OnSubmitHandler}>
            <div className="form-group">
              <p className="form-label">Email Address</p>
              <input
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
                type="email"
                className="form-input"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <p className="form-label">Password</p>
              <input
              onChange={(e)=> setPassword(e.target.value)}
              value={password}
                type="password"
                className="form-input"
                placeholder="Enter password"
                required
              />
            </div>
            <button className="form-button" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
