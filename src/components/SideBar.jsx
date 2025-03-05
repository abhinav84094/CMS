import React from 'react'
import { useAuth } from '../context/Auth_context'
import { NavLink, useNavigate } from 'react-router-dom';

function SideBar() {

  const {user, logOut} = useAuth();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logOut();
    navigate('/login');
  }

  return (
    <div className='bg-gray-600 w-[20vw] h-[100vh] '>
      <h2 className='text-3xl font-bold'>CMS Portal</h2>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <NavLink to="/add">
                  Add Content
                </NavLink>
              </li>
              <li>
                <NavLink to="/view">
                  View Content
                </NavLink>
              </li>
            </>
          ):(
            <>
              <li>
                <NavLink to="/login">
                  LogIn
                </NavLink>
              </li>
              <li className=''>
                <NavLink to="/signUp">
                  SignUp
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
      {user && (
        <div>
          <button onClick={handleLogout}>LogOut</button>
        </div>
      )}
    </div>
  )
}

export default SideBar