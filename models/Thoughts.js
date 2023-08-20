// destructure required items from mongoose
const { Schema, model } = require("mongoose");

const Reaction = require('./Reaction')

// thought schema
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 250
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    username: {
      type: String,
      required: true
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// return length of reactions
thoughtsSchema.virtual("reactionCount").get(function () {
  return `${this.reactions.length}`;
});

module.exports = model('thoughts', thoughtsSchema)