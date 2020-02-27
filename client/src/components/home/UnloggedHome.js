import React from 'react';
import { Link } from 'react-router-dom';

const UnloggedHome = () => {
  return (
    <div className='unlogged-home' >
      <div className='login-signup'>
        <div> <Link to='/login'><button>Login</button></Link> </div>
        <div><Link to='/Signup'><button>Sign Up</button></Link></div>
      </div>
    </div>
  )
}

export default UnloggedHome;