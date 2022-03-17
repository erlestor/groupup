import React from "react"
import Register from "./Register"
import "./login.css"

const RegisterPage = ({ setUser }) => {
  return (
    <div className="login-page">
      <Register setUser={setUser} />
    </div>
  )
}

export default RegisterPage
