import React, { useState } from "react"
import axios from "../../axios"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  // Handle submit
  const handleLogInSubmit = (e) => {
    e.preventDefault()
    validateUserInfo()
  }

  const clearInputs = () => {
    setEmail("")
    setPassword("")
  }

  const validateUserInfo = async () => {
    await axios
      .post("/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.status)
        if (response.status === 200) {
          //nice
          console.log(response)
          setError("")
          clearInputs("")
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setError("Invalid email/password combination")
        } else {
          setError("internal server error")
        }
      })
  }

  return (
    <div>
      <h2>Login</h2>
      <form className="login-form">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input
          type="submit"
          className="btn"
          value="Log in"
          onClick={(e) => handleLogInSubmit(e)}
        />
        <p className="error">{error}</p>
      </form>
    </div>
  )
}

export default Login
