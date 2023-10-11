import axios from 'axios'
const API_URL = `${process.env.REACT_APP_PROXY}/api/tickets`
// console.log(process.env.REACT_APP_PROXY)

// create ticket
const createTicket = async (ticket, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.post(API_URL, ticket, config)
  return res.data
}

// fetch user tickets
const fetchTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(API_URL, config)
  return res.data
}
// fetch user ticket
const fetchTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(`${API_URL}/${ticketId}`, config)
  return res.data
}

// fetch user tickets
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.put(
    `${API_URL}/${ticketId}`,
    { status: 'closed' },
    config
  )
  return res.data
}

const ticketService = {
  createTicket,
  fetchTickets,
  fetchTicket,
  closeTicket,
}
export default ticketService
