
import axios from 'axios'
import { create } from 'zustand'
 

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,

  register: async (userData)=>{
    try{
      const res=API.post("/auth/register",userData)
      const { name, token, role } = res.data;
      const user=name
      set({user,token,role})
      alert("Registration sucessful ✅")
     
      return { success: true, role }

    }
    catch(err){
      alert(err.response?.data?.message ||"registration failed")
      return { success: false } 
    }
  },
  
  login: async (userData) => {
    try {
      const res = await API.post('/auth/login', userData)
      const { name, token, role } = res.data;
      const user=name
      set({ user, token, role })
      alert('Login successful ✅')
      
      return { success: true, role }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed ❌')
      return { success: false }
    }
  },

  getMe: async () => {
    try {
      const res = await API.get('/auth/me')
      const { name, token, role } = res.data;
      const user=name

      set({ user, token, role })
      return { success: true, role }
    }
     catch ( err) {
      return { success: false }
    }
  },
  logout: () =>
    set({
      user: null,
      token: null,
      role: null,
    }),
}))


export default useAuthStore
