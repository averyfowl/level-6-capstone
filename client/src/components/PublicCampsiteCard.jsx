import React, { useState } from "react"

export default function PublicCampsiteCard({
  _id,
  name,
  town,
  state,
  where,
  description,
  cost,
  image,
  user,
  comments = [],
  addComment,
  deleteComment,
  currentUserId  
}) {
  const [commentText, setCommentText] = useState("") //holds comment text

  function handleSubmit(e) {
    e.preventDefault() //prevents page reload
    if (commentText.trim()) { //makes sure its not just spaces
      addComment(_id, commentText).then(updated => {
        if (updated) {
          setCommentText("")
        }
      })
    }
  }

  return ( //displays campsite details and who posted it
    <div className="main-container">
      <div className="campsite-card">
        <h3>{name}</h3>
        <p>{town}, {state}</p>
        <p>{where}</p>
        <p>{description}</p>
        <p>Cost: {cost}</p>
        <img src={image} alt={name} />
        <p><em>Posted by: {user?.username}</em></p>

        <h4>Comments</h4>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {comments.map(c => (
              <li key={c._id}>
                <strong>{c.username}</strong>: {c.text}
                {c.user === currentUserId && (  // only shows delete button if the comments user matches the logged in user
                  <button onClick={() => deleteComment(_id, c._id)}>Delete</button>
                )}
              </li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            required
          />
          <button>Add</button>
        </form>
      </div>
    </div>
  )
}


