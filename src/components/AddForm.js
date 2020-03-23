import React, { Component } from 'react';

export default class AddForm extends Component {

  state = {
    label: ''
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.label);
    this.setState({
      label: ''
    });
  };

  render() {
    return (
      <form className="add"
        onSubmit={this.onSubmit}
      >
        <input type="text"
              className="add__inpt"
              onChange={this.onLabelChange}
              placeholder="What's need to be done?"
              value={this.state.label}
        >
        </input>
        <button 
          className="add__btn"
        >Add task</button>
      </form>
    )
  }
};