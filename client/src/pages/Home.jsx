import React, { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useContext(UserContext)

  return (
    <div className="home-page">
      <h1>Welcome to Eleutheromania {user.username}!</h1>
      <h4>e.g "The intense and earnest zeal for freedom. 
        It's an irresistible desire to escape to somewhere new and to explore."</h4>
      <p>Come on in and explore some real good campsites that range from 
        totally obscure to very well known!</p>
      <ul>
        <li >  Go to the <Link to="/profile" className = "hlink">Profile</Link> page to submit some campsites of your own or</li>
        <li >  visit the <Link to="/public" className = "hlink">Public</Link> page to explore and comment on evryone elses! </li>
      </ul>
    </div>
  )
}
