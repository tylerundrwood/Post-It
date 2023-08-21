const { Schema, Types } = require("mongoose");

// getter method to format date
function formatThisDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

// reaction schema that will be a sub-document
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        max_length: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: formatThisDate
      }
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );

  module.exports = reactionSchema