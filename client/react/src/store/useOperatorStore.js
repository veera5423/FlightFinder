import axios from 'axios'
import { create } from 'zustand'

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  })


const useOperatorStore = create((set,get) => ({
  flights: [],
  loading: false,

  fetchMyFlights: async () => {
    try {
      set({ loading: true });
      const res = await API.get("/operators/my-flights", { withCredentials: true });
      set({ flights: res.data });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      set({ loading: false });
    }
  },

  addFlight: async (flightData) => {
    try {
      const res = await API.post("/operators/", flightData, { withCredentials: true });
      set((state) => ({
        flights: [...state.flights, res.data.flight], // add to existing list
      }));
      await get().fetchMyFlights();
    } catch (err) {
      console.error("Add flight error:", err);
    }
  },
  deleteFlight: async (flightId) => {
    try {
      await API.delete(`/operators/flight/${flightId}`, { withCredentials: true });
      
      // Refresh the flights after deletion
      await get().fetchMyFlights();
    } catch (err) {
      console.error("Delete flight error:", err);
    }
  },
  
}));
export default useOperatorStore;
