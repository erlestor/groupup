import { useState } from "react"
import "./App.css"
import LoginPage from "./components/login/LoginPage"
import RegisterPage from "./components/login/RegisterPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import GroupList from "./components/groupPage/GroupList"
import GroupPage from "./components/groupPage/GroupPage"
import YourGroupPage from "./components/groupPage/YourGroupPage"
import CreateGroup from "./components/groupPage/CreateGroup"
import EditGroup from "./components/groupPage/EditGroup"
import FilterGroups from "./components/groupPage/FilterGroups"
import SelectGroup from "./components/groupPage/SelectGroup"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  const [user, setUser] = useState(null)
  const [group, setGroup] = useState(null)

  console.log(group)

  return (
    <Router>
      <div className="app-container">
        <Header user={user} setUser={setUser} group={group} />
        {user ? (
          <Routes>
            <Route
              path="/"
              element={<SelectGroup user={user} setGroup={setGroup} />}
            />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route
              path="/group/:matchGroupId"
              element={<GroupPage user={user} group={group} />}
            />
            <Route path="/register" element={<RegisterPage setUser={setUser} />} />
            <Route
              path="/group"
              element={<YourGroupPage user={user} group={group} />}
            />
            <Route path="/group/:id/edit" element={<EditGroup user={user} />} />
            <Route path="/create-group" element={<CreateGroup user={user} />} />
            <Route path="/match" element={<FilterGroups group={group} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/register" element={<RegisterPage setUser={setUser} />} />
            <Route path="/*" element={<LoginPage setUser={setUser} />} />
          </Routes>
        )}
        <Footer />
      </div>
    </Router>
  )
}

export default App
