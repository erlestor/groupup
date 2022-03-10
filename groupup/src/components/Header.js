import React from "react"
import { HiUserGroup } from "react-icons/hi"
import { FaUserCircle } from "react-icons/fa"
import { useNavigate, Link } from "react-router-dom"

const Header = ({ user, setUser, group }) => {
  const navigate = useNavigate()

  const handleButton = () => {
    if (user) {
      setUser(null)
      navigate("/login")
    } else navigate("/login")
  }

  const handleGroupClick = () => {
    navigate(`/group`)
  }

  return (
    <div className="header">
      <Link to="/" className="router-link">
        <HiUserGroup size={40} />
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
        <div className="header-group-container">
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
