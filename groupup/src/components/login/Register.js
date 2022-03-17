import React, { useState } from "react"
import { emailRegex, passwordRegex, nameRegex } from "./RegisterRegex"
import axios from "../../axios"
import { useNavigate } from "react-router-dom"

const Register = ({ setUser }) => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [birthday, setBirthday] = useState()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [dateInputType, setDateInputType] = useState("text")

  const [error, setError] = useState("")
  const date18YearsAgo = new Date()
  date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18)
  const maxDate = date18YearsAgo.toISOString().split("T")[0]
  console.log(date18YearsAgo)

  const validateRegex = (regex, str, errorMsg) => {
    if (!str.match(regex)) {
      setError(errorMsg)
      return false
    }
    return true
  }

  const handleRegisterClick = (e) => {
    e.preventDefault()
    if (!validateRegex(nameRegex, firstName, "firstname is invalid")) return
    else if (!validateRegex(nameRegex, lastName, "lastname is invalid")) return
    else if (!validateRegex(emailRegex, email, "email is invalid")) return
    else if (!validateRegex(passwordRegex, password, "password is invalid"))
      return
    else if (
      !validateRegex(
        passwordRegex,
        confirmPassword,
        "confirm password is invalid"
      )
    )
      return
    else if (!(Date.parse(birthday) <= Date.parse(maxDate))) {
      setError("date is invalid")
      return
    } else if (password !== confirmPassword) {
      setError("passwords must match")
      return
    }

    setError("")
    postUser()
  }

  const clearInputs = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setBirthday("")
    setPassword("")
    setConfirmPassword("")
  }

  const handleBackClick = () => {
    navigate("/")
  }

  const postUser = async () => {
    const name = firstName + " " + lastName

    await axios
      .post("/register", {
        name: name,
        email: email,
        birthDate: birthday,
        password: password,
      })
      .then(function (response) {
        console.log(response.status)
        if (response.status === 200) {
          console.log(response)
          clearInputs()
          setError("")
          setUser(response.data)
          navigate("/")
        }
      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setError("user already exists")
        } else {
          setError("internal server error")
        }
      })
  }

  return (
    <div className="register-comp">
      <h2>Register</h2>
      <form className="register-form">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name"
          id="firstName"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name"
          id="lastName"
        />
        <input
          type={dateInputType}
          placeholder="birthday"
          onFocus={() => setDateInputType("date")}
          max={maxDate}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          id="birthday"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          id="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          id="password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
          id="confirmPassword"
        />
        <input
          type="submit"
          className="btn"
          value="Register"
          onClick={(e) => handleRegisterClick(e)}
          id="register-btn"
        />
        <p className="error">{error}</p>
        <p onClick={handleBackClick} className="link">To login</p>
      </form>
    </div>
  )
}

export default Register
