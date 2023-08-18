// require express router
const router = require('express').Router()

// require the api folder holding our routes
const apiRoutes = require('./api/index');

// set up the /api endpoint
router.use('/api', apiRoutes);

// if user inputs wrong route, send err message
router.use((req, res) => res.send('Try again!'));

module.exports = router;