//our profile page
import React, { useState } from "react"
import { useCampsites } from "../context/CampsiteProvider"
import CampsiteCard from "../components/CampsiteCard"

export default function Profile() {
  const { userCampsites, addCampsite, deleteCampsite, editCampsite } = useCampsites()
//formData hold values for addidng a campsite
  const [formData, setFormData] = useState({
    name: "",
    town: "",
    state: "",
    where: "",
    description: "",
    cost: "",
    image: ""
  })

  function handleChange(e) {
    const { name, value } = e.target //each input is linked in the name so handleChange knows what to update
    setFormData(prev => ({ ...prev, [name]: value }))
  }
//prevents page refresh when you push submit
//the new campsite is added to state and then the form clears
  async function handleSubmit(e) {
    e.preventDefault()
    await addCampsite(formData)
    setFormData({
      name: "", 
      town: "",
      state: "",
      where: "",
      description: "",
      cost: "",
      image: ""
    })
  }
  

  return (
    <>
        <div>
      <h1 className = "welcome">Welcome to your Profile</h1>
          <div className = "input-form">
      <form onSubmit={handleSubmit}>
        <input 
        name="name" 
        value={formData.name} 
        onChange={handleChange} 
        placeholder="Campsite name" 
        required />
        <input 
        name="town" 
        value={formData.town} 
        onChange={handleChange} 
        placeholder="Nearest town" 
        required />
        <input 
        name="state" 
        value={formData.state} 
        onChange={handleChange} 
        placeholder="State" 
        required />
        <input 
        name="where" 
        value={formData.where} 
        onChange={handleChange} 
        placeholder="Coordinates" 
        required />
        <input 
        name="description" 
        value={formData.description} 
        onChange={handleChange} 
        placeholder="Description" 
        required />
        <label>
          <input 
          type="radio" 
          name="cost" 
          value="free" 
          onChange={handleChange} 
          checked={formData.cost === "free"} />
          Free
        </label>
        <label>
          <input 
          type="radio" 
          name="cost" 
          value="paid" 
          onChange={handleChange} 
          checked={formData.cost === "paid"} />
          Paid
        </label>
        <input 
        name="image" 
        value={formData.image} 
        onChange={handleChange} 
        placeholder="Image URL" 
        required />
        <button>Submit Campsite</button>
      </form>
        </div>

      <h2>Your Campsites</h2>
      {/*loops through the users campsites and makes a campsite card for each one */}
      {userCampsites.map(camp => (
        <CampsiteCard
        key={camp._id}
        {...camp}
        onDelete={() => deleteCampsite(camp._id)} //deletes campsite by ID
        onEdit={updatedData => editCampsite(camp._id, updatedData)} 
        />
      ))}
    </div>
      </>
  )
}









