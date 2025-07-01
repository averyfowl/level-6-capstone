import React, { useState } from "react"

// lets users view OR edit a campsite

export default function CampsiteCard({ _id, name, town, state, where, description, cost, image, onDelete, onEdit }) {
 //tracks if the card in en editing mode- starts out not 
  const [isEditing, setIsEditing] = useState(false)

// Pre-fills the form with current data
  const [editData, setEditData] = useState({ name, town, state, where, description, cost, image })

// Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submission (calls parent’s onEdit function)
  //prevent page reload switches back to view mode
  function handleSubmit(e) {
    e.preventDefault()
    onEdit(editData)
    setIsEditing(false)
  }

  // EDITING MODE 
  // IF youre editing ...change these things
  if (isEditing) {
    return (
      <div className = "main-container">

      <form onSubmit={handleSubmit} className="campsite-card edit-form">
        <input 
        name="name" 
        value={editData.name} 
        onChange={handleChange} 
        required />
        <input 
        name="town" 
        value={editData.town} 
        onChange={handleChange} 
        required />
        <input 
        name="state" 
        value={editData.state} 
        onChange={handleChange} 
        required />
        <input 
        name="where" 
        value={editData.where} 
        onChange={handleChange} 
        required />
        <input 
        name="description" 
        value={editData.description} 
        onChange={handleChange} 
        required />

        <label>
          <input
            type="radio"
            name="cost"
            value="free"
            onChange={handleChange}
            checked={editData.cost === "free"}
            required
            />
          Free
        </label>
        <label>
          <input
            type="radio"
            name="cost"
            value="paid"
            onChange={handleChange}
            checked={editData.cost === "paid"}
            required
            />
          Paid
        </label>

        <input name="image" value={editData.image} onChange={handleChange} required />

        <button type="submit">Save</button>
        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
      </form>
            </div>
    )
  }
  // VIEW MODE 
  //shows all the info after editing or not
  return (
    <div className="campsite-card">
      <h3>{name}</h3>
      <p><strong>LOCATION:</strong> {town}, {state}</p>
      <p><strong>COORDINATES:</strong> {where}</p>
      <p><strong>DESCRIPTION:</strong> {description}</p>
      <p><strong>COST:</strong> {cost === "free" ? "free" : "paid"}</p>
      <img src={image} alt={name}  />

      <button onClick={() => setIsEditing(true)}>Edit</button> {/*fucntion so it doesnt just run willy nilly */}
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}







