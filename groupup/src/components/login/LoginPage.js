import React from "react"
import Login from "./Login"
import "./login.css"

const LoginPage = ({ setUser }) => {
  return (
    <div className="login-page">
      <Login setUser={setUser} />
    </div>
  )
}

export default LoginPage
