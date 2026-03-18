import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import "./App.css"

import ProtectedRoute from "./routes/ProtectedRoute"

import { Rudiment } from "./types/rudiment"
import {
  getRudiments,
  createRudiment,
  updateRudiment,
  deleteRudiment
} from "./api/rudimentsApi"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashBoardPage from "./pages/DashboardPage"
import SessionsPage from "./pages/SessionsPage"

function RudimentsPageTest() {
  const [rudiments, setRudiments] = useState<Rudiment[]>([])
  const [name, setName] = useState("")
  const [bpm, setBpm] = useState("")

  const fetchRudiments = async () => {
      const res = await getRudiments()
      setRudiments(res.data)
  }

  useEffect(() => {
    fetchRudiments()
  }, [])


  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    await createRudiment({
      name, 
      bpm: Number(bpm)
    })

    setName("")
    setBpm("")

    fetchRudiments()
  }

  const handleDelete = async (id: string) => {
  
    await deleteRudiment(id)

    fetchRudiments()
  }

  const handleUpdate = async (rudiment: Rudiment) => {

    const newName = prompt("Enter new name:", rudiment.name)
    const newBpm = prompt("Enter new BPM:", String(rudiment.bpm))

    if(!newName || !newBpm) return

    await updateRudiment(rudiment._id, {
      name: newName,
      bpm: Number(newBpm)
    })

    fetchRudiments()
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






function App() {

return (
    <BrowserRouter>
      <Routes>

        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

        <Route path="/" element={<DashBoardPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rudiments"
          element={
            <ProtectedRoute>
              <RudimentsPageTest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sessions"
          element={
            <ProtectedRoute>
              <SessionsPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )  
}

export default App