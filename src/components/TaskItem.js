import React, { Component } from 'react'

class TaskItem extends Component {
	constructor( props ){
		super(props)
	}
	render(){
		return (
			<li className="list-group-item">
				<div>
					<span></span>
					{this.props.item.value}
					<button type="button" className="close" onClick={this.onClickClose}>&times;</button>
				</div>
			</li>
		)
	}
}

export default TaskItem