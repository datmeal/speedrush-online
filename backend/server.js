const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config.js');

const todoRoutes = express.Router();

const Todo = require('./todo.model');


app.use(cors());
app.use(bodyParser.json());

// mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
mongoose.connect(config.mongoUri, { useNewUrlParser: true });
const { connection } = mongoose;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

todoRoutes.route('/').get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      return console.log(err);
    }
    return res.json(todos);
  });
});

todoRoutes.route('/:id').get((req, res) => {
  const { id } = req.params;
  Todo.findById(id, (err, todo) => res.json(todo));
});

todoRoutes.route('/update/:id').post((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) {
      res.status(404).send('data is not found');
    } else {
      console.log('updating...', req.body);
      todo.todo_description = req.body.todoDescription;
      todo.todo_responsible = req.body.todoResponsible;
      todo.todo_priority = req.body.todoPriority;
      todo.todo_completed = req.body.todoCompleted;

      todo.save().then((todo) => {
        res.json('Todo updated!');
      })
        .catch((err) => {
          res.status(400).send('Update not possible');
        });
    }
  });
});

todoRoutes.route('/add').post((req, res) => {
  console.log('adding...', req.body);
  const todo = new Todo(req.body);
  todo.save()
    .then((todo) => {
      res.status(200).json({ todo: 'todo added successfully' });
    })
    .catch((err) => {
      res.status(400).send('adding new todo failed');
    });
});

app.use('/todos', todoRoutes);

app.listen(config.PORT, () => {
  console.log(`Server is running on Port: ${config.PORT}`);
});
