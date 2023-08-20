const { User, Thoughts } = require("../models/index");

module.exports = {
  // get all users
  getAllUsers(req, res) {
    User.find()
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get one user by _id
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: 'thoughts', path: 'friends'})
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID found!" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update user by _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params._id },
      { username: req.body.username,
        email: req.body.email },
      { new: true },
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with that ID!" });
        } else {
          console.log('Updated user!')
          res.json(user);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete user by _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params._id })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID!" });
        } else {
          console.log('User deleted!')
          res.json(user);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // add new friend to friends list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId},
      { $addToSet: { friends: req.params.friendId} },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if(!user) {
          console.log('Unable to add friend!')
        } else {
          console.log('Friend added!')
          res.json(user)
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // delete friend from friends list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if(!user) {
          console.log('Unable to delete friend!')
        } else {
          console.log('Friend Deleted!')
          res.json(user)
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err);
      })
  }
};