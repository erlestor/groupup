import { useState } from "react"
import "./App.css"
import LoginPage from "./components/login/LoginPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import GroupList from "./components/groupPage/GroupList"
import GroupPage from "./components/groupPage/GroupPage"
import CreateGroup from "./components/groupPage/CreateGroup"
import EditGroup from "./components/groupPage/EditGroup"
import FilterGroups from "./components/groupPage/FilterGroups"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <div className="app-container">
        <Header user={user} setUser={setUser} />
        {user ? (
          <Routes>
            <Route path="/" element={<FilterGroups />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/group/:id" element={<GroupPage user={user} />} />
            <Route path="/group/:id/edit" element={<EditGroup user={user} />} />
            <Route path="/create-group" element={<CreateGroup user={user} />} />
          </Routes>
        ) : (
          <LoginPage setUser={setUser} />
        )}
        <Footer />
      </div>
    </Router>
  )
}

export default App
