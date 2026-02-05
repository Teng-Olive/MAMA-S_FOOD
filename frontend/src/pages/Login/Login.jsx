import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { ShopContext } from '../../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../../App'

const Login = () => {

  // State to track whether the user is in 'Login' or 'Sign Up' mode
  const [currentState, setCurrentState] = useState('Login')

   // Accessing token, setToken function, and navigate function from ShopContext
  const {token, setToken, navigate} = useContext(ShopContext)

  // States to store user input for name, email, and password
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

    // Function to handle form submission
  const onSubmitHandler = async(event)=> {
    event.preventDefault(); // Prevents the form from refreshing the page

    try {
      if(currentState === 'Sign Up'){
         // If the user is signing up, send a request to the registration API
        const response = await axios.post(backendUrl + '/api/user/register' , {name, email, password})
        if(response.data.success){
          // Save token in global state
          setToken(response.data.token) 
           // Show success message
          toast.success(response.data.message) 
          localStorage.setItem('token', response.data.token) // Save token in local storage
        }
        else{
          toast.error(response.data.message)
        }

      }
      else {
        // If the user is logging in, send a request to the login API
        const response = await axios.post(backendUrl + '/api/user/login', {email,password})
        if(response.data.success){
          setToken(response.data.token) // Save token in global state
          toast.success(response.data.message) // Show success message
          localStorage.setItem('token', response.data.token)  // Save token in local storage
        } else{
          toast.error(response.data.message)  // Show error message if login fails
        }
        
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }

  }

    // Redirect the user to the homepage if they are already logged in
  useEffect(()=> {
    if(token){
      navigate('/')
    }
  },[token])


  return (
    <div>
      <form onSubmit={onSubmitHandler} className='auth-form'>
        <div className="form-header">
          <p className="form-title">{currentState} </p>
        </div>
        {/* Show Name Input only if user is in Sign Up mode */}
        {
          currentState === 'Login' ? null : (
            <input onChange={(e)=> setName(e.target.value)} value={name}  type="text" className='form-input' placeholder='Full Name' required />
          )
        }
        
        <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" className='form-input' placeholder='Email' required />
        <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className='form-input' placeholder='Password' required />
        <div className="form_footer">
          <p className="forgot-pswd"> Forgot password</p>
          {
            currentState === 'Login' ? (
              // If in Login mode, show "Create Account" link
              <p className='toggle-auth-state' onClick={()=> setCurrentState('Sign Up')}>Create account</p>
            ) : (
               // If in Sign Up mode, show "Login Here" link
              <p className='toggle-auth-state' onClick={()=> setCurrentState('Login')}>Login Here</p>
            )
          }
        </div>
         {/* Submit Button - Changes text based on Login or Sign Up mode */}
        <button className="form-botton">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login