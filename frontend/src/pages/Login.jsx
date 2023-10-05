import React, { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <section className="heading">
        <FaSignInAlt /> Login
        <p>Login to grt support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email"
            ></input>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              id="password"
              minLength={6}
              name="password"
              value={password}
              onChange={onChange}
              required
              placeholder="Enter your password"
            ></input>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              {' '}
              SUBMIT
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
