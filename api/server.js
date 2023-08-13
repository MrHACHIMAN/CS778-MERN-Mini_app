const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TBoard = require("./models/TBoardModel");
const moment = require("moment");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect("mongodb://127.0.0.1:27017/mini_app", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(console.error);

app.get("/todos", async (req, res) => {
    const todos = await TBoard.find();

    res.json(todos);
});

app.post("/todo/new", (req, res) => {
    const todo = new TBoard({
        text: req.body.text,
    });

    todo.save();

    res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
    const result = await TBoard.findByIdAndDelete(req.params.id);

    res.json({result});
});

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await TBoard.findById(req.params.id);

    todo.Done = !todo.Done;

    todo.save();

    res.json(todo);
});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});
