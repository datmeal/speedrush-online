import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false,
    };

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeTodoDescription(e) {
    this.setState({
      todo_description: e.target.value,
    });
  }

  onChangeTodoResponsible(e) {
    this.setState({
      todo_responsible: e.target.value,
    });
  }

  onChangeTodoPriority(e) {
    this.setState({
      todo_priority: e.target.value,
    });
  }

  onSubmit(e) {
    const {
      todo_description: todoDescription,
      todo_responsible: todoResponsible,
      todo_priority: todoPriority,
    } = this.state;
    e.preventDefault();
    console.log('Form submitted:');
    console.log(`Todo description: ${todoDescription}`);
    console.log(`Todo responsible: ${todoResponsible}`);
    console.log(`Todo priority: ${todoPriority}`);

    const newTodo = {
      todo_description: this.state.todo_description,
      todo_responsible: this.state.todo_responsible,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed,
    };

    axios.post('http://localhost:4000/todos/add', newTodo)
      .then((res) => console.log(res.data));

    this.setState({
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false,
    });
  }

  render() {
    const { todo_description: todoDescription, todo_responsible: todoResponsible, todo_priority: todoPriority } = this.state;
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Create New Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input type="text" className="form-control" value={todoDescription} onChange={this.onChangeTodoDescription} />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input type="text" className="form-control" value={todoResponsible} onChange={this.onChangeTodoResponsible} />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="priorityOptions" id="priorityLow" value="Low" checked={todoPriority === 'Low'} onChange={this.onChangeTodoPriority} />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="priorityOptions" id="priorityMedium" value="Medium" checked={todoPriority === 'Medium'} onChange={this.onChangeTodoPriority} />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="priorityOptions" id="priorityHigh" value="High" checked={todoPriority === 'High'} onChange={this.onChangeTodoPriority} />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Todo" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
