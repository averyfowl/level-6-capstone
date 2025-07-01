import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider"

export default function Auth() {
  const { signup, login, errMsg } = useContext(UserContext) //comes from UserProvider
  const [toggle, setToggle] = useState(false) //are you in signup or login mode
  const [inputs, setInputs] = useState({ username: "", password: "" })// whats put into auth form

  function handleChange(e) { //tracks what changes in the input form
    const { name, value } = e.target
    setInputs(prev => ({ ...prev, [name]: value }))
  }
//submits the post request for login and signup
  function handleSubmit(e) {
    e.preventDefault()
    toggle ? login(inputs) : signup(inputs)
  }

  return (
    <div>
      <h1 className = "signup">{toggle ? "Login" : "Sign Up"}</h1> {/*false = sign up, true = login */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={inputs.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button>{toggle ? "Login" : "Sign Up"}</button>
        {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
      </form>
      {/*toggles between the two questions */}
      <p onClick={() => setToggle(prev => !prev)} style={{ cursor: "pointer" }} className="signup">
        {toggle ? "Need an account? Sign up" : "Already have an account? Login"}
      </p>
    </div>
  )
}


