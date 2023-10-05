import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // redirect if success
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isSuccess, isError, message, dispatch, navigate])
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  if (isLoading) {
    return <Spinner />
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
