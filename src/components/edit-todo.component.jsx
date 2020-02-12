import React, { Component } from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
    this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
    this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
    this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      todoDescription: '',
      todoResponsible: '',
      todoPriority: '',
      todoCompleted: false,
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/todos/${this.props.match.params.id}`)
      .then((response) => {
        const {
          todo_description: todoDescription, todo_responsible: todoResponsible, todo_priority: todoPriority, todo_completed: todoCompleted,
        } = response.data;
        this.setState({
          todoDescription, todoResponsible, todoPriority, todoCompleted,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeTodoDescription(e) {
    this.setState({
      todoDescription: e.target.value,
    });
  }

  onChangeTodoResponsible(e) {
    this.setState({
      todoResponsible: e.target.value,
    });
  }

  onChangeTodoPriority(e) {
    this.setState({
      todoPriority: e.target.value,
    });
  }

  onChangeTodoCompleted() {
    const { todoCompleted } = this.state;
    this.setState({
      todoCompleted: !todoCompleted,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      todoDescription, todoResponsible, todoPriority, todoCompleted,
    } = this.state;
    const obj = {
      todoDescription, todoResponsible, todoPriority, todoCompleted,
    };
    console.log(obj);
    axios.post(`http://localhost:4000/todos/update/${this.props.match.params.id}`, obj)
      .then((res) => console.log(res.data));

    this.props.history.push('/');
  }

  render() {
    const {
      todoDescription, todoResponsible, todoPriority, todoCompleted,
    } = this.state;
    return (
      <div>
        <h3 align="center">Update Todo</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={todoDescription}
              onChange={this.onChangeTodoDescription}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              type="text"
              className="form-control"
              value={todoResponsible}
              onChange={this.onChangeTodoResponsible}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
                checked={todoPriority === 'Low'}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
                checked={todoPriority === 'Medium'}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
                checked={todoPriority === 'High'}
                onChange={this.onChangeTodoPriority}
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              id="completedCheckbox"
              type="checkbox"
              name="completedCheckbox"
              onChange={this.onChangeTodoCompleted}
              checked={todoCompleted}
              value={todoCompleted}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
                        Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input type="submit" value="Update Todo" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
