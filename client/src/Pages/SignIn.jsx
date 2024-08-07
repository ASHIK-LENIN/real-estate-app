import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signFailure } from '../redux/user/userSlice.js';
import axios from 'axios';
axios.defaults.withCredentials = true

import OAuth from '../Components/OAuth.jsx'

function SignIn() {

  const [formData, setFormData] = useState({})

  const { loading = false, error = null } = useSelector((state) => state.user);
  console.log('Error:', error);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

  }
  console.log(formData);

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    try {

      dispatch(signInStart());

      const response = await axios.post('http://localhost:3000/api/auth/login', formData,{
        withCredentials:true
      });

      const data = response.data;

      console.log(data);

      if (data.success === false) {
        dispatch(signFailure(data.message))

        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch(signFailure(errorMessage))
    }

  };

  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >

        <input type="email" placeholder='email'
          className='border p-3 rounded-lg ' id='email' onChange={handleChange} />
        <input type="text" placeholder='password'
          className='border p-3 rounded-lg ' id='password' onChange={handleChange} />

        <button disabled={loading} className='bg-blue-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Login'}
        </button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Don't have an acccount ?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>

      {error && <p className='text-red-500 mt-5 text-center '>{error}</p>}

    </div>
  )
}

export default SignIn