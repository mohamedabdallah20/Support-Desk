import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function NewTicket() {
  const { user } = useSelector((state) => state.auth)
  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Done')
  }

  return (
    <>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please Fill Out the Form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => {
                setProduct(e.target.value)
              }}
            >
              <option value="iphone">iphone</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
              <option value="Mac book pro">Mac book pro</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={description}
              placeholder="Description"
              required
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket
