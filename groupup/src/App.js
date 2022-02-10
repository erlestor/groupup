import "./App.css"
import LoginPage from "./components/login/LoginPage"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="app-container">
      <Header />
      <LoginPage />
      <Footer />
    </div>
  )
}

export default App
