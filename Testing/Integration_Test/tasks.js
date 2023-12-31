const express = require('express');
const mongoose = require("mongoose");
const app = express();
const Task = require('./Task');
const auth = require('./auth');

mongoose.connect('mongodb://127.0.0.1:27017/tasks_tests')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((e) => console.log(e.message));

app.use(express.json());

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});

        if (!tasks.length) return res.status(404).send('Not found any tasks.');

        res.send(tasks);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.get('/api/tasks/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(404).send('Invalid ID.');

        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).send('Task with given id not found.');

        res.send(task);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

app.post('/api/tasks', auth, async (req, res) => {
    const newTask = new Task(req.body);

    try {
        const result = await newTask.save();
        res.status(201).send(result);
    } catch (e) {
        res.status(400).send(e);
    }
});

const server = app.listen(3000, () => console.log('Connected to Server...'));

module.exports = server;