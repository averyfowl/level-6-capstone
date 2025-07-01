import React, { createContext, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext() //other compenets can useContext(UserContext)


export function UserProvider({ children }) {
  //checks if theres saved user data in localStorage- loads user, token, and err message
  const initState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
    token: localStorage.getItem("token") || "",
    errMsg: ""
  }
//manages authentication state- user,token,errMsg
  const [userState, setUserState] = useState(initState)

  // Create axios instance inside component so it can access latest userState.token
  const userAxios = axios.create()
//adds a token to every request- so backend knows which user is doing what
  userAxios.interceptors.request.use(config => {
    const token = userState.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  async function signup(credentials) {
    try {
      const res = await axios.post("/api/auth/signup", credentials) //sends username and password to server
      const { token, user } = res.data // server responds with user data
      localStorage.setItem("token", token)
      localStorage.setItem("userId", user._id)
      localStorage.setItem("user", JSON.stringify(user))// stores info so user stays logged in after refresh
      setUserState(prev => ({ ...prev, token, user, errMsg: "" })) //state is updated so app knows youre logged in
    } catch (err) {
      console.error("Signup Error:", err.response?.data?.errMsg)
      setUserState(prev => ({
        ...prev,
        errMsg: err.response?.data?.errMsg || "Signup failed"
      }))
    }
  }

  
  async function login(credentials) {
    try {
      const res = await axios.post("/api/auth/login", credentials)
      const { token, user } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("userId", user._id)
      localStorage.setItem("user", JSON.stringify(user))
      setUserState(prev => ({ ...prev, token, user, errMsg: "" }))
    } catch (err) {
      console.error("Login Error:", err.response?.data?.errMsg)
      setUserState(prev => ({
        ...prev,
        errMsg: err.response?.data?.errMsg || "Login failed"
      }))
    }
  }
//removes token and user from local storage upon logout and resets user state
  async function logout() {
    try {
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      setUserState({
        user: {},
        token: "",
        errMsg: ""
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return ( //makes all of this avaliable to any child component
    <UserContext.Provider
      value={{
        ...userState,
        signup,
        login,
        logout,
        userAxios
      }}
    >
      {children}
    </UserContext.Provider>
  )
}










