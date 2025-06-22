import axios from 'axios'
import { create } from 'zustand'

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  })
const useOperatorStore = create((set) => ({
  flights: [],
  
  fetchMyFlights: async () => {
    const res = await API.get('/flights/my-flights')
    set({ flights: res.data })
  },

  addFlight: async (flightData) => {
    const res = await API.post('/flights', flightData)
    alert('Flight created ✅')
    set((state) => ({
      flights: [...state.flights, res.data.flight]
    }))
  },
}))

export default useOperatorStore
