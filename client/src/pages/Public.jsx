import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/UserProvider"
import PublicCampsiteCard from "../components/PublicCampsiteCard"

export default function Public() {
  const { userAxios, user } = useContext(UserContext)// useAxios and user from UserContext
  const [publicCampsites, setPublicCampsites] = useState([])//stores all public campsites
//gets all campsites from backend
  useEffect(() => {
    getAllCampsites()
  }, [])
//gets all campsites from backend
  async function getAllCampsites() {
    try {
      const res = await userAxios.get("/api/main/campsites")
      setPublicCampsites(res.data)
    } catch (err) {
      console.error("Error fetching public campsites:", err)
    }
  }
//updates the campsite with the new comment data
  async function addComment(campsiteId, commentText) {
    try {
      const res = await userAxios.post(`/api/main/campsites/${campsiteId}/comments`, { text: commentText })
      const updatedCampsite = res.data
  
      setPublicCampsites(prev =>
        prev.map(camp => (camp._id === campsiteId ? updatedCampsite : camp))
      )
      return updatedCampsite
    } catch (err) {
      console.error("Error adding comment:", err)
    }
  }
//Delete a comment and filters out the comment 
  async function deleteComment(campsiteId, commentId) {
    try {
      await userAxios.delete(`/api/main/campsites/${campsiteId}/comments/${commentId}`)
      setPublicCampsites(prevCampsites =>
        prevCampsites.map(camp => {
          if (camp._id === campsiteId) {
            return {
              ...camp,
              comments: camp.comments.filter(c => c._id !== commentId),
            }
          }
          return camp
        })
      )
    } catch (err) {
      console.error("Error deleting comment:", err)
    }
  }

  return (
    <div> 
      <h1 className="puHeader">All Campsites</h1>
      {publicCampsites.length === 0 ? (
        <p>No campsites available.</p>
      ) : (
        publicCampsites.map(camp => ( //
          <PublicCampsiteCard
            key={camp._id}
            {...camp} //displays 
            addComment={addComment}
            deleteComment={deleteComment}
            currentUserId={user?._id}  // <-- Pass current user id here
          />
        ))
      )}
    </div>
  )
}



