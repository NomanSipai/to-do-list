require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModal = require("./Models/Todo");

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d85gc.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected successfully 🚀");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

app.post("/create", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const newTodo = await TodoModal.create({ task });

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/all-todo", async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;
    const query = search ? { task: { $regex: search, $options: "i" } } : {};

    const totalTodos = await TodoModal.countDocuments(query);
    const todos = await TodoModal.find(query)
      .limit(parseInt(limit))
      .skip((page - 1) * limit);

    res
      .status(200)
      .json({ tasks: todos, totalPages: Math.ceil(totalTodos / limit) });
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});

app.put("/change-todo-status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const status = await TodoModal.findOneAndUpdate(
      { _id: id },
      { completed },
      { new: true }
    );
    if (!status) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/get-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModal.findOne({ _id: id });
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/update-todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    const updatedTodo = await TodoModal.findOneAndUpdate(
      { _id: id },
      { task },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/delete-todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await TodoModal.findOneAndDelete({ _id: id });
    if (!deleteTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully", deleteTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("server is running on 3001");
});
