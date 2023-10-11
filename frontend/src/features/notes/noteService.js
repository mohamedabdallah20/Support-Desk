import axios from 'axios'

const API_URL = 'api/tickets'

// fetch ticket Notes
const fetchNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(`${API_URL}/${ticketId}/notes`, config)
  return res.data
}

const noteService = {
  fetchNotes,
}
export default noteService
