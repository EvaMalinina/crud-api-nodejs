import React, { Component } from 'react';

export default class AddForm extends Component {

  constructor(note) {
    super();
    //Set default value
    this.state = {
      label: '',
      done: false,
      id: ''
    }

    this.onLabelChange = this.onLabelChange.bind(this);
  }

  onLabelChange(evt) {
    this.setState({
      label: evt.target.value
    });
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
        <button type="submit" 
                className="add__btn"
        >
          Add task
        </button>
      </form>
    )
  }
};