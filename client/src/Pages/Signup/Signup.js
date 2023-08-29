import React, { useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import { axiosClient } from '../../utils/axiosClient';
function Signup() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName]=useState('');
  const navigate=useNavigate();

   async function handleSubmit(e){
      e.preventDefault();
        try {
          await axiosClient.post('/auth/signup',{
            name,
            email,
            password
          })
          navigate('/login');

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="box">
    <span className='borderLine'></span>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className='inputBox'>
          <input type="text" required='required' onChange={(e) => { setName(e.target.value) }} />
          <span>Name</span>
          <i></i>
        </div>
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
        <p className='subHeading'>Do not  have an account? <Link className='sign' to="/login">Login</Link></p>
        </div>
        <input type="submit" value='Sign Up' />
      </form>
    </div>
  )
}

export default Signup