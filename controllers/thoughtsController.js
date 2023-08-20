const { User, Thoughts, Reactions } = require("../models/index");

module.exports = {

  getAllThoughts(req, res) {
    Thoughts.find()
      .then((thought) => {
        console.log(`Here's all the thoughts!`);
        res.json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
 
  getOneThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID!" });
        } else {
          console.log(`Here's your thought!`);
          res.json(thought);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "Unable to create thought!" });
        } else {
          res.json("Thought created!");
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update thought by _id
  updateThought(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText, username: req.body.username },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID!" });
        } else {
          console.log("Thought updated!");
          res.json(thought);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteThought(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID!" });
        } else {
          console.log("Thought deleted!");
          res.json(thought);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create reaction
  createReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => {
        console.log(req.params.thoughtId)
        if (!thought) {
          console.log("Unable to create reaction!");
        } else {
          console.log("Reaction created!");
          res.json(thought);
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // delete reaction
  deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId : req.query.reactionId } }},
      
    )
      .then((thought) => {
        console.log(thought)
        if (!thought) {
          console.log("No thought found with that id!");
        } else {
          console.log("Reaction deleted!");
          res.json(thought);
        }
      })
      .catch((err) => {
        console.log(req.query.reactionId)
        console.log(err)
        res.status(500).json(err);
      });
  }
};