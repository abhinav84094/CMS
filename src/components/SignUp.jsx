import React, {useState} from 'react'
import { useAuth } from '../context/Auth_context';
import { useNavigate, Link } from 'react-router-dom';
import isNotEmpty from '../utils/validation.js'



function SignUp() {

  const {user, signUp} = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if(user){
    navigate("/user");
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!isNotEmpty(username) || !isNotEmpty(password) || !isNotEmpty(confirmPassword)){
      setError("Please fill info");
      return ;
    }
    if(password !== confirmPassword){
      setError("Password not matched");
    }

    const result = signUp(username, password);
    if(result.success){
      navigate('/viewContent');
    }else{
      setError(result.error);
    }

    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }


  return (
    <div className='flex flex-col gap-5 border border-white m-20'>
    <h2 className='text-4xl ml-[20%]'>Signup</h2>
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 mr-10'>
      <div>
        <label className='ml-20 '>Enter username : </label>
        <input className='border border-white' onChange={(e)=>setUsername(e.target.value)} placeholder='username' type='text' value={username} />
      </div>
      <div>
        <label className='ml-20 '>Enter password : </label>
        <input className='border border-white' onChange={(e)=>setPassword(e.target.value)} placeholder='password' type='text' value={password} />
      </div>
      <div>
        <label className='ml-20 '>Confirm password : </label>
        <input className='border border-white' onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='confirm password' type='text' value={confirmPassword} />
      </div>

      {error && <div className='ml-40'>{error}</div>}
      <button className='w-50 ml-[30%]' type='submit'>SignUp</button>
      {username===user.username && <p>Already have an account? <Link to="/login">Log In</Link></p>}
    </form>
    </div>
  )
}

export default SignUp