import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import AddForm from './AddForm';
import TodoList from './TodoList';

export default class Notes extends Component {

  maxId = 100;

  constructor() {
    super();
    this.state = {
      todoData: [
        this.createItem('Example of the note')
      ]
    }
  }

  createItem(label) {
    return {
      label,
      done: false,
      id: this.maxId++
    }
  };

  deleteItem = (id) => {

    this.setState(({ todoData }) => {
      const indx = todoData.findIndex((el) => el.id === id);
      
      const newArr = [
        ...todoData.slice( 0, indx ),
        ...todoData.slice( indx + 1)
      ];

      return {
        todoData: newArr
      }
      
    })

    fetch('http://localhost:8082/api/notes' + id, {
      method: 'DELETE',
    })
    .then(res => res.json());
  };

  addItem = (label) => {

    const newItem = this.createItem(label);

    this.setState(({ todoData }) => {
      
      const newArr = [
        ...todoData,
        newItem
      ];

      return {
        todoData: newArr
      }
    })
    
  
    fetch('http://localhost:8082/api/notes', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        console.log('Note added');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Add note error please try again');
    });
   
  };

  toggleProperty( arr, id, propName) {
    const indx = arr.findIndex((el) => el.id === id);

      const oldTodoItem = arr[indx];
      const newTodoItem = { ...oldTodoItem, [propName]: !oldTodoItem[propName]};

      return [
        ...arr.slice(0, indx),
        newTodoItem,
        ...arr.slice(indx + 1)
      ];
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty( todoData, id, 'done')
      };
    });
  };

  componentDidMount() {
    //GET message from server using fetch api
    fetch('/api/notes')
      .then(res => res.text())
      .then(res => this.setState({message: res}));
  }
  
  render() {

    const { todoData } = this.state;

    return (
      <div className="notes">
        <div className="container">
          <p>{this.state.message}</p>
          
          <TodoList 
            todos={ todoData }
            onDeleted={ this.deleteItem }
            onAdd={ this.addItem }
            onToggleDone={ this.onToggleDone }
          />
          <AddForm onAdd={ this.addItem}/>
        </div>
      </div>
    )
  }
};
