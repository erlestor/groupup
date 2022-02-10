import React, { useState, useEffect } from "react"
import { emailRegex, passwordRegex, nameRegex } from "./RegisterRegex"

const Register = () => {
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

  // hvis error skal vises må preventDefault() kjører
  const handleRegisterSubmit = (e) => {
    const name = firstName + " " + lastName

    if (password !== confirmPassword) {
      e.preventDefault()
      setError("passwords must match")
    } else {
      setError("")
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form className="register-form">
        <input
          required
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name"
          pattern={nameRegex}
        />
        <input
          required
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name"
          pattern={nameRegex}
        />
        <input
          required
          type={dateInputType}
          placeholder="birthday"
          onFocus={() => setDateInputType("date")}
          max={maxDate}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          pattern={emailRegex}
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          pattern={passwordRegex}
        />
        <input
          required
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="confirm password"
          pattern={passwordRegex}
        />
        <input
          required
          type="submit"
          className="btn"
          value="Register"
          onClick={(e) => handleRegisterSubmit(e)}
        />
        <p className="error">{error}</p>
      </form>
    </div>
  )
}

export default Register
