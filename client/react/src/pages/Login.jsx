import { useState } from 'react'


import useAuthStore from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const { login } = useAuthStore()
  const navigate = useNavigate()
  

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(form)
    
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
        <h2 className="text-2xl font-bold text-center text-orange-600">Login</h2>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="input" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" required />
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded cursor-pointer">Login</button>
      </form>
    </div>
  )
}

export default Login
