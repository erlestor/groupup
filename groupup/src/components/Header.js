import React from "react"
import { HiUserGroup } from "react-icons/hi"
import { useNavigate, Link } from "react-router-dom"
import Bilde from "../Images/groupupBILDE.png"

const Header = ({ user, setUser }) => {
  const navigate = useNavigate()

  const handleButton = () => {
    if (user) {
      setUser(null)
      navigate("/login")
    } else navigate("/login")
  }

  return (
    <div className="header">
      <Link to="/" className="router-link">
        <img  src = {Bilde} className = "skjalgsittbilde"/>
         
        <h1 className="header-text">GroupUp</h1>
      </Link>
      <div className="header-login-container">
        {user && <p id="user-email">{user.email}</p>}
        <button className="btn" onClick={handleButton} id="sign-in-out-btn">
          {user ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  )
}

export default Header
