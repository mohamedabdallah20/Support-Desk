import axios from 'axios'
const API_URL = '/api/tickets'

const createTicket = async (ticket, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.post(API_URL, ticket, config)
  return res.data
}

const ticketService = {
  createTicket,
}
export default ticketService
