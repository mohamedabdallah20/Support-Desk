import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = formData
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('password do not match')
    }
  }
  return (
    <>
      <section className="heading">
        <FaUser /> Register
        <p>please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
              placeholder="Enter your name"
            ></input>
          </div>
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
            <input
              className="form-control"
              type="password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              minLength={6}
              required
              placeholder="confirm password"
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

export default Register
