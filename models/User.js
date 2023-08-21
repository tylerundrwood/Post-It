// destructure required items from mongoose
const { Schema, model } = require("mongoose");

// require other models
const thoughtsSchema = require('./Thoughts')

// email validation
require("mongoose-type-email");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thoughts'
    }],
    friends: [this]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(function() {
  return `${this.friends.length}`
});

module.exports = model('user', userSchema)