import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/todos/')
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  todoList() {
    const { todos } = this.state;
    return todos.map((currentTodo, i) => <Todo todo={currentTodo} key={i} />);
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.todoList()}
          </tbody>
        </table>
      </div>
    );
  }
}

const Todo = (props) => {
  const { todo } = props;
  const {
    todo_description: todoDescription, todo_responsible: todoResponsible, todo_priority: todoPriority, todo_completed: todoCompleted,
  } = todo;
  return (
    <tr>
      <td className={todoCompleted ? 'completed' : ''}>{todoDescription}</td>
      <td className={todoCompleted ? 'completed' : ''}>{todoResponsible}</td>
      <td className={todoCompleted ? 'completed' : ''}>{todoPriority}</td>
      <td>
        <Link to={`/edit/${props.todo._id}`}>Edit</Link>
      </td>
    </tr>
  );
};

Todo.propTypes = {
  todo: PropTypes.objectOf({
    todo_description: PropTypes.string.isRequired,
    todo_responsible: PropTypes.string.isRequired,
    todo_priority: PropTypes.string.isRequired,
  }).isRequired,
};
