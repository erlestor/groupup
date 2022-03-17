import React from "react"
import { HiUserGroup } from "react-icons/hi"
import { FaUserCircle } from "react-icons/fa"
import { useNavigate, Link } from "react-router-dom"
import Bilde from "../Images/groupupBILDE.png"

const Header = ({ user, setUser, group, setGroup }) => {
  const navigate = useNavigate()

  const handleButton = () => {
    setUser(null)
    setGroup(null)
    navigate("/login")
  }

  const handleGroupClick = () => {
    navigate(`/group`)
  }

  return (
    <div className="header">
      <Link to="/" className="router-link">
        <img src={Bilde} className="skjalgsittbilde" alt="group" />
        <h1 className="header-text">GroupUp</h1>
      </Link>
      {user && (
        <Link to="/" className="router-link">
          <p className="header-text">Select group</p>
        </Link>
      )}
      {group && (
        <Link to="/match" className="router-link">
          <p className="header-text">Find matches</p>
        </Link>
      )}
      {group && (
        <div className="header-group-container" onClick={handleGroupClick}>
          <HiUserGroup size={30} />
          <p>{group.name}</p>
        </div>
      )}
      {user && (
        <div className="header-name-container">
          <FaUserCircle size={30} />
          <p id="user-email">{user.email}</p>
        </div>
      )}
      <button className="btn header-btn" onClick={handleButton}>
        {user ? "Sign out" : "Sign in"}
      </button>
    </div>
  )
}

export default Header
