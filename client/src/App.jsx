import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [rudiments, setRudiments] = useState([])
  const [name, setName] = useState("")
  const [bpm, setBpm] = useState("")

  useEffect(() => {
    const fetchRudiments = async () => {
      const res = await axios.get("http://localhost:8080/api/rudiments")
      setRudiments(res.data)
    }
    fetchRudiments()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post("http://localhost:8080/api/rudiments", {
      name, 
      bpm: Number(bpm)
    })

    setName("")
    setBpm("")
    
    // Fetch updated list
    const res = await axios.get("http://localhost:8080/api/rudiments")
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
          <li key={r.id}>
            {r.name} – {r.bpm} BPM
          </li>
        ))}
      </ul>
  </div>
 )
}

export default App