import { useEffect, useState } from "react";
import axios from "axios";

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
    
    // Fetch updated list
    const res = await axios.get(API_URL)
    setRudiments(res.data)
  }

  const handleDelete = async (id) => {
    console.log("Deleting ID:", id)

    await axios.delete(`${API_URL}/${id}`)

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