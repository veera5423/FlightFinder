import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuthStore from '../store/useAuthStore'

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const navigate = useNavigate()
  const { register }=useAuthStore()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await register(form)
    
    if (result.success) {
      const role = result.role // get role after login
      if (role === 'admin') navigate('/admin/dashboard')
      else if (role === 'operator') navigate('/operator')
      else navigate('/')
    }
  }
  

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form className="bg-white p-8 rounded shadow w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center text-orange-600">Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="input" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" required />
        <select name="role" onChange={handleChange} className="input">
          <option value="user">User</option>
          <option value="operator">Operator</option>
        </select>
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded">Register</button>
      </form>
    </div>
  )
}

export default Register
