const router = require('express').Router();

// require controller functions
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtsController')

// get all thoughts
router.route('/').get(getAllThoughts);

// get one thought
router.route('/:thoughtId').get(getOneThought);

// create thought
router.route('/createThought').post(createThought);

// delete thought
router.route('/deleteThought/:thoughtId').delete(deleteThought);

// update thought
router.route('/updateThought/:thoughtId').put(updateThought);

// create reaction
router.route('/:thoughtId/createReaction').post(createReaction);

// delete reaction
router.route('/:thoughtId/deleteReaction').delete(deleteReaction);

module.exports = router;