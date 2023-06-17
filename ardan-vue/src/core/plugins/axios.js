import axios from 'axios'
// const baseURL = 'http://localhost:8000/'
const baseURL = 'http://easycoapi.kopikoding.com/'
export default axios.create({
  baseURL,
  // You can add your headers here
  headers: {
    'Content-Type': 'application/json',
  }
})