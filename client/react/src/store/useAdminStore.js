import axios from 'axios'
import { create } from 'zustand'

export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  })

const useAdminStore = create((set) => ({
   pendingOperators: [],
  operators: [],
  stats: {},

  fetchPendingOperators: async () => {
    const res = await API.get('/admin/operators/pending')
    console.log("pendingOperatos",res.data);
    
    set({ pendingOperators: res.data })
  },
  fetchOperators: async () => {
    const res = await API.get('/admin/operators')
    set({ operators: res.data })
  },

  approveOperator: async (id) => {
    await API.put(`/admin/operators/${id}/approve`)
    alert('Approved ✅')
  },

  rejectOperator: async (id) => {
    await API.put(`/admin/operators/${id}/reject`)
    alert('Rejected ❌')
  },
 fetchStats : async () => {
    try {
      const res = await API.get('/admin/stats', { withCredentials: true });
      set({ stats: res.data });
    } catch (err) {
      console.error("Failed to fetch stats");
    }
  },
  
}))

export default useAdminStore

