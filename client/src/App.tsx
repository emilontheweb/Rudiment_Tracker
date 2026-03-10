import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [rudiments, setRudiments] = useState([])
  const [name, setName] = useState("")
  const [bpm, setBpm] = useState("")

  const API_URL = "http://localhost:5000/api/rudiments"

  useEffect(() => {
    const fetchRudiments = async () => {
      const res = await axios.get(API_URL)
      setRudiments(res.data)
    }
    fetchRudiments()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post(API_URL, {
      name, 
      bpm: Number(bpm)
    })

    setName("")
    setBpm("")
    const res = await axios.get(API_URL)
    setRudiments(res.data)
  }

  const handleDelete = async (id) => {
  
    await axios.delete(`${API_URL}/${id}`)

    const res = await axios.get(API_URL)
    setRudiments(res.data)
  }

  const handleUpdate = async (rudiment) => {

    const newName = prompt("Enter new name:", rudiment.name)
    const newBpm = prompt("Enter new BPM:", rudiment.bpm)


    if(!newName || !newBpm) return

    await axios.put(`${API_URL}/${rudiment._id}`, {
      name: newName,
      bpm: Number(newBpm)
    })

    const res = await axios.get(API_URL)
    setRudiments(res.data)
  }

 return (
  <div>
    <h1>Rudiment Tracker</h1>
    
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rudiment name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="BPM"
        value={bpm}
        onChange={(e) => setBpm(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>

    <ul>
        {rudiments.map((r) => (
          <li key={r._id}>
            {r.name} – {r.bpm} BPM
            <button onClick={() => handleUpdate(r)}>Edit</button>
            <button onClick={() => handleDelete(r._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
  </div>
 )
}

export default App