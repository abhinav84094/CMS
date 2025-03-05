import React, { useState } from 'react'
import { useAuth } from '../context/Auth_context'
import { Link,useNavigate } from 'react-router-dom';

function LogIn() {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {users, login} = useAuth();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!username || !password){
      setError("enter username and password");
      return ;
    }

    const result = await login(username, password);

    if (result.success) {
      navigate('/view'); // Redirect on successful login
    } else {
      setError(result.error || 'Invalid username or password'); // Show error message
      return ;
    }

    setUsername("");
    setPassword("");
    
  }


  return (
    <div className='flex flex-col gap-5 border border-white m-20'>
    <h2 className='text-4xl ml-[20%]'>LogIn</h2>
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 mr-10'>
      <div>
        <label className='ml-20 '>Enter username : </label>
        <input className='border border-white' onChange={(e)=>setUsername(e.target.value)} placeholder='username' type='text' value={username} />
      </div>
      <div>
        <label className='ml-20 '>Enter password : </label>
        <input className='border border-white' onChange={(e)=>setPassword(e.target.value)} placeholder='password' type='text' value={password} />
      </div>
    
      {error && <div className='ml-40'>{error}</div>}
      <button className='w-50 ml-[30%]' type='submit'>LogIn</button>
      {/* {username!==users.username && <p>invalid username <Link to="/signup">SignUp</Link></p>} */}
      <p className='text-center'>
          Don't have an account? <Link to='/signUp' className='text-blue-500'>Sign Up</Link>
        </p>
    </form>
    </div>
  )
}

export default LogIn