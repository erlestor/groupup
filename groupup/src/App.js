import { useState } from "react"
import "./App.css"
import LoginPage from "./components/login/LoginPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import GroupList from "./components/groupPage/GroupList"
import GroupPage from "./components/groupPage/GroupPage"
import AddMember from "./components/groupPage/AddMember"
import CreateGroup from "./components/groupPage/CreateGroup"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <div className="app-container">
        <Header user={user} setUser={setUser} />
        {user ? (
          <Routes>
            <Route path="/" element={<GroupList />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/group/:id" element={<GroupPage user={user} />} />
            <Route path="/group/:id/edit" element={<AddMember user={user} />} />
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
