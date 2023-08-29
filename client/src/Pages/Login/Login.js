import React, { useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post('/auth/login', {
        email,
        password
      })

      setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
      navigate('/dashboard');

    } catch (error) {
      console.log(error);
    }
  }



  return (

    <div className="box" style={{height:420}}>
    <span className='borderLine'></span>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='inputBox'>
          <input type="email" required='required' onChange={(e) => { setEmail(e.target.value) }} />
          <span>Email</span>
          <i></i>
        </div>
        <div className='inputBox'>
          <input type="password" required='required'onChange={(e) => { setPassword(e.target.value) }} />
          <span>Password</span> 
          <i></i>
        </div>
        <div className="link">
        <p className='subHeading'>Do not  have an account? <Link className='sign' to="/signup">Sign up</Link></p>
        </div>
        <input type="submit" value='Login' />
      </form>
    </div>

  )
}

export default Login