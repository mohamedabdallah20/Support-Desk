import axios from 'axios'

const API_URL = `${process.env.REACT_APP_PROXY}/api/tickets`

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
// create ticket Note
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.post(
    `${API_URL}/${ticketId}/notes`,
    {
      text: noteText,
    },
    config
  )
  return res.data
}

const noteService = {
  fetchNotes,
  createNote,
}
export default noteService
