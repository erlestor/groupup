import React from "react"
import Login from "./Login"
import Register from "./Register"
import "./login.css"

const LoginPage = ({ setUser }) => {
  return (
    <div className="login-page">
      <Register setUser={setUser} />
      <Login setUser={setUser} />
    </div>
  )
}

export default LoginPage
