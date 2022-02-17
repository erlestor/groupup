import "./App.css"
import LoginPage from "./components/login/LoginPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import GroupList from "./components/groupPage/GroupList"
import GroupPage from "./components/groupPage/GroupPage"

function App() {
  return (
    <div className="app-container">
      <Header />
      {/* <LoginPage /> */}
      <GroupPage />
      <Footer />
    </div>
  )
}

export default App
