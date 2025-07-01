
import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

export default function Navbar() {
  const { logout } = useContext(UserContext) //comes from userprovider
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate("/auth")  // redirect to auth page after logout
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/public">Public</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}









