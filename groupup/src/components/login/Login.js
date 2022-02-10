import React, { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")

  // Handle submit
  const handleLogInSubmit = (e) => {
    e.preventDefault()
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
        <p>{error}</p>
      </form>
    </div>
  )
}

export default Login
