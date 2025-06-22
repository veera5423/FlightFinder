import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import OperatorDashboard from './pages/OperatorDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Flights from './pages/Flight'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/operator"
          element={
            <ProtectedRoute allowedRoles={['operator']}>
              <OperatorDashboard />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/bookings"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <div>My Bookings Page</div>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Route path='/flights?:from&:to&:date' element={<Flights/>}/>
    </BrowserRouter>
  )
}

export default App
