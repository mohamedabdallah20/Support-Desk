import axios from 'axios'
const API_URL = '/api/users'
// register user
const register = async (user) => {
  const res = await axios.post(API_URL, user)
  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  return res.data
}

// Log Out
const logout = () => {
  localStorage.removeItem('user')
}

// Login
const login = async (user) => {
  const res = await axios.post(`${API_URL}/login`, user)
  if (res) {
    localStorage.setItem('user', JSON.stringify(res.data))
  }
  return res.data
}

const authService = {
  register,
  logout,
  login,
}
export default authService
