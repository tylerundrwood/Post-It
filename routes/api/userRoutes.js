const router = require('express').Router();

// require controllers
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers);

// /api/users/:userId
router.route('/:userId').get(getOneUser);

// /api/users/createUser
router.route('/createUser').post(createUser);

// /api/users/deleteUser/:_id
router.route('/deleteUser/:_id').delete(deleteUser)

// /api/users/updateUser/:_id
router.route('/updateUser/:_id').put(updateUser)

// /api/users/:userId/addFriends/:friendId
router.route('/:userId/addFriends/:friendId').put(addFriend)

// /api/users/:userId/deleteFriends/:friendId
router.route('/:userId/deleteFriends/:friendId').delete(deleteFriend)


module.exports = router