import { useState } from 'react'
import useOperatorStore from '../store/useOperatorStore'

const FlightForm = () => {
  const { addFlight } = useOperatorStore()

  const [form, setForm] = useState({
    flightNumber: '',
    from: '',
    to: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    duration: '',
    direct: true,
    classType: 'economy',
    totalSeats: '',
    availableSeats: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addFlight(form)
    setForm({ ...form, flightNumber: '' }) // Optional: reset one field
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-4 shadow rounded-lg mb-6">
      {Object.keys(form).map((key) => {
        if (key === 'direct') {
          return (
            <label key={key} className="col-span-2 flex items-center gap-2">
              <input type="checkbox" name="direct" checked={form.direct} onChange={handleChange} />
              Direct Flight?
            </label>
          )
        }

        return (
          <input
            key={key}
            name={key}
            type={key.includes('Time') ? 'datetime-local' : 'text'}
            value={form[key]}
            placeholder={key}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        )
      })}
      <button type="submit" className="col-span-2 bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
        Add Flight
      </button>
    </form>
  )
}

export default FlightForm
