import React, { Component } from 'react'
import TaskItem from '@/components/TaskItem'

class ToDoList extends Component {
	render(){
		let tasks = this.props.items.map(( task, i ) => {
			return (
				<TaskItem key={i} item={task} index={i} removeTask={this.props.removeTask} taskDone={this.props.taskDone}/>
			)
		})
		return (
			<ul className="list-group">{tasks}</ul>
		)
	}
}

export default ToDoList