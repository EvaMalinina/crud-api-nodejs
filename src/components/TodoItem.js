import React, { Component } from 'react';

export default class TodoItem extends Component {

  render() {
    const { label, onDeleted,
            onToggleDone, done } = this.props;

    let classNames = 'item';
    if (done) {
      classNames += ' done';
    }

    return (
      <div className={ classNames }>
        <span onClick={ onToggleDone } >{ label }</span>
        <div className="item__btns">
          <a href="#1" 
            className="item__icon"
            onClick={ onDeleted }
          >
            <i className="fas fa-trash-alt"></i>
          </a>
        </div>
      </div> 
    )
  }
};