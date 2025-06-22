// Get all pending operators
router.get('/operators/pending', isAdmin, async (req, res) => {
    const pending = await User.find({ role: 'operator', status: 'pending' })
    res.json(pending)
  })
  
  // Approve operator
  router.put('/operators/:id/approve', isAdmin, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { status: 'approved' })
    res.json({ message: 'Operator approved ✅' })
  })
  
  // Reject operator
  router.put('/operators/:id/reject', isAdmin, async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { status: 'rejected' })
    res.json({ message: 'Operator rejected ❌' })
  })
  