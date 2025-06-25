
import axios from 'axios'
import { create } from 'zustand'
 

export const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
})

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  role: null,
  loading:true,
  bookings:[],

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
      console.log(token);
      
      alert('Login successful ✅')
      
      return { success: true, role }
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed ❌')
      return { success: false }
    }
  },

  checkAuth: async () => {
    try {
      const res = await API.get('/auth/me', { withCredentials: true })
      const { name, token, role } = res.data
      const user = name
      set({ user, token, role, loading: false })
    } catch (e) {
      set({ user: null, token: null, role: null, loading: false })
    }
  },
  
  logout: () =>
    set({
      user: null,
      token: null,
      role: null,
    }),
    addBooking: async (bookingData) => {
      try {
        const res = await API.post('/bookings', bookingData);
        alert('Booking successful ✅');
    
        // Optional: return booking details if you want to use it
        set({bookings: res.data.booking})
        return { success: true, bookings: res.data.booking };
      } catch (err) {
        console.error("Booking failed:", err.response?.data?.msg || err.message);
        alert(err.response?.data?.msg || "Booking failed ❌");
        return { success: false };
      }
    },

    
}))


export default useAuthStore
