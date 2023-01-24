import axios from "axios"

const instance = axios.create({
  baseURL: "https://api.groupup.cumcounter.tk",
})

export default instance
