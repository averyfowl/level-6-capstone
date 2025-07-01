import { useContext } from "react"
import { UserContext } from "./context/UserProvider"
import Navbar from "./components/Navbar"
import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Public from "./pages/Public"

export default function App() {
  const { token } = useContext(UserContext) //grabs token from UserContext- makes sure user is authenticated

  return (
    <>
      {token && <Navbar />} {/*only shows nav if a user is logged in */}
      <Routes>
        {/*shows auth if not logged in-otherwise go to profile  */}
        <Route path="/auth" element={!token ? <Auth /> : <Navigate to="/profile" />} />
         {/*if you have a token- go to each page */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/auth" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/auth" />} />
        <Route path="/public" element={token ? <Public /> : <Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to={token ? "/profile" : "/auth"} />} />
      </Routes>
    </>
  )
}









