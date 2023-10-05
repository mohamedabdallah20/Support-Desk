import React from 'react'
import { FaSignOutAlt, FaSignInAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
function Header() {
  const { user } = useSelector((state) => state.auth)
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Support Desk</Link>
      </div>
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          {!user && (
            <Link to="/register">
              <FaUser /> Register
            </Link>
          )}
        </li>
        <li>
          <Link to="/logout">
            <FaSignOutAlt /> Logout
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
