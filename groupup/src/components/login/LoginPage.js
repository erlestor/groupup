import React from "react"
import Login from "./Login"
import Register from "./Register"
import "./login.css"

const LoginPage = () => {
  return (
    <div className="login-page">
      <Register />
      <Login />
    </div>
  )
}

export default LoginPage
