import React from 'react'
import { FaSignOutAlt, FaSignInAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset, logout } from '../features/auth/authSlice'
function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk </Link>

        <div className="header-heading">
          <span>_by : </span>
          <a
            className="header-heading"
            href="https://github.com/mohamedabdallah20/"
            target="blank"
          >
            {' '}
            @Mohammed Abdallah
          </a>
        </div>
      </div>
      {user ? (
        <ul>
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt /> Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FaUser /> Register
            </Link>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Header
