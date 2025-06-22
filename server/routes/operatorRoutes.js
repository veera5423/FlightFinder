// // Add new flight
// router.post('/flights', isOperatorApproved, async (req, res) => {
//     const newFlight = new Flight({ ...req.body, operatorId: req.user._id })
//     await newFlight.save()
//     res.status(201).json({ message: 'Flight added ✅', flight: newFlight })
//   })
  
//   // Get flights for operator
//   router.get('/flights', isOperatorApproved, async (req, res) => {
//     const flights = await Flight.find({ operatorId: req.user._id })
//     res.json(flights)
//   })
  // Middleware to check if user is approved operator
const isApprovedOperator = (req, res, next) => {
    if (req.user?.role === 'operator' && req.user?.status === 'approved') {
      return next()
    }
    return res.status(403).json({ message: 'Access denied: Not an approved operator' })
  }
  
  // Add flight
  router.post('/', auth, isApprovedOperator, async (req, res) => {
    const flight = new Flight({ ...req.body, operator: req.user._id })
    await flight.save()
    res.status(201).json({ message: 'Flight created', flight })
  })
  
  // Get flights for the logged-in operator
  router.get('/my-flights', auth, isApprovedOperator, async (req, res) => {
    const flights = await Flight.find({ operator: req.user._id })
    res.json(flights)
  })
  