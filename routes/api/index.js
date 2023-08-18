// require express router
const router = require('express').Router();

// require files we will use for our routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// set up the end points for the files
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;