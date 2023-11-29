//@ts-check
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';

const Login = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    identifier: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    /* const res = */ 
    await axios.post(`http://localhost:1337/api/auth/local`, {
      identifier: userData.identifier,
      password: userData.password
       })
      .then(response => {
       /*  console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt); */

        // Handle success.
        Cookies.set('token', response.data.jwt);

        //redirect to dashboard
        router.push('/dashboard');
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
        alert('login gagal')
      });
    }catch (e) {
      console.log(e.message);
  }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value })
  }

  return (
    <div className="container mt-4 mx-auto" style={{width:'25%'}}>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <div className="form-floating mb-4">
          <input type="email" id="form2Example1" name="identifier" className="form-control" onChange={e => handleChange(e)} />
          <label className="form-label" htmlFor="form2Example1">Email address</label>
          {userData.identifier}
        </div>
        <div className="form-floating mb-4">
          <input type="password" id="form2Example2" name='password' className="form-control" onChange={e => handleChange(e)} />
          <label className="form-label" htmlFor="form2Example2">Password</label>
          {userData.password}
        </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
      </form>
    </div>
  )
}

export default Login;