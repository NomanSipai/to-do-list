const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TodoModal = mongoose.model("todos", TodoSchema);
module.exports = TodoModal;
