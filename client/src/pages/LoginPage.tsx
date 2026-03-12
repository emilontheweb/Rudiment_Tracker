import { use, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    try {
      await login(email, password)

      navigate("/dashboard")

    } catch (error) {
      setError("Invalid email or password")
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input 
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
         />

        <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
         />

        <button type="submit">Login</button>

      </form>

      {error && <p>{error}</p>}
    </div>
  )
}

export default LoginPage