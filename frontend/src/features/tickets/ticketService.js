import axios from 'axios'
const API_URL = '/api/tickets'

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

const ticketService = {
  createTicket,
  fetchTickets,
}
export default ticketService
