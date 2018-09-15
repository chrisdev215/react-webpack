import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import NavBar from '@/components/NavBar'

import Header from '@/components/Header'
import TodoList from '@/components/ToDoList'

class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    console.log("props -->", props)
    this.state = {todoItems: props.todoItems};
  }
  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length+1, 
      value: todoItem.newItemValue, 
      done: false
    });
    this.setState({todoItems: todoItems});
  }
  removeItem (itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});  
  }
  render() {
    return (
      <div id="main">
        <Header />
        <TodoList items={this.props.todoItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
      </div>
    );
  }
}

export default TodoApp