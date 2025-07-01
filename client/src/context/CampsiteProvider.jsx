import React, { createContext, useContext, useState, useEffect } from "react"
import { UserContext } from "./UserProvider"

const CampsiteContext = createContext()//provides campsite data and functions to components
//provites the context hook
export function useCampsites() {
  return useContext(CampsiteContext)
}

export function CampsiteProvider({ children }) {
  const { userAxios, user } = useContext(UserContext)//auth and user from userContext
  const [userCampsites, setUserCampsites] = useState([])
//gets campsites that belong to the logged in user
  async function getUserCampsites() {
    try {
      const res = await userAxios.get("/api/main/campsites/user")
      setUserCampsites(res.data)
    } catch (err) {
      console.error("Error fetching user campsites:", err)
    }
  }
//ADD a new campsite- adds new ones to the current array of existing ones
  async function addCampsite(campsiteData) {
    try {
      const res = await userAxios.post("/api/main/campsites", campsiteData)
      setUserCampsites(prev => [...prev, res.data])
    } catch (err) {
      console.error("Error adding campsite:", err)
    }
  }
//DELETE campsie by ID- filters the deleted one out of the array
  async function deleteCampsite(campsiteId) {
    try {
      await userAxios.delete(`/api/main/campsites/${campsiteId}`)
      setUserCampsites(prev => prev.filter(site => site._id !== campsiteId))
    } catch (err) {
      console.error("Error deleting campsite:", err)
    }
  }
//UPDATES new data if youre editing- replaces the updated one to the array
  async function editCampsite(campsiteId, updatedData) {
    try {
      const res = await userAxios.put(`/api/main/campsites/${campsiteId}`, updatedData)
      setUserCampsites(prev =>
        prev.map(site => (site._id === campsiteId ? res.data : site))
      )
    } catch (err) {
      console.error("Error editing campsite:", err)
    }
  }
//runs when the user changes. if logged in it fetches their campsite,
//  if they logout it clears the campsite state
  useEffect(() => {
    if (user && user._id) {
      getUserCampsites()
    } else {
      setUserCampsites([]) // clear campsites on logout
    }
  }, [user])

  return (
    <CampsiteContext.Provider
      value={{ 
        userCampsites, 
        addCampsite, 
        deleteCampsite, 
        editCampsite
      }}
    >
      {children}
    </CampsiteContext.Provider>
  )
}



