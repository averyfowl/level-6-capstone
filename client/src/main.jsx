
import React from "react" //comes from react libraries
import ReactDOM from "react-dom/client"
import App from "./App"
import { UserProvider } from "./context/UserProvider"
import { CampsiteProvider } from "./context/CampsiteProvider"
import { BrowserRouter } from "react-router-dom"  //allows route, link, and useNavigate
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/*link */}
      <UserProvider> {/*login, logout, signup, user, auth token */}
        <CampsiteProvider> {/*campsite data, CRUD */}
          <App />
        </CampsiteProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)


