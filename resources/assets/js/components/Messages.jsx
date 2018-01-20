import React from 'react'
import { connect } from "react-redux"
import { modalAddUserToggle, getUsers, submitForm, updateUser, deleteUser, modalEditUserToggle } from '../actions/usersActions'
import { Link } from 'react-router-dom'

@connect((store) => {
	return {
		msg: store.msg.message,
		status: store.msg.status,
		error: store.msg.error,
		success: store.msg.success,
		page: store.msg.page
	}
})
export class Messages extends React.Component {
	constructor(props){
		super(props);	
	} 

	componentWillMount(){
		console.log(this.props.status)
	}

	componentDidUpdate(){
		console.log(this.props.status)
	}

	render(){
		let classes = 'page-msg';
		classes += this.props.status == 'success' ? ' has-success' : '';
		classes += this.props.status == 'error' ? ' has-danger' : '';

		let iconClasses = 'fa';
		iconClasses += this.props.status == 'success' ? ' fa-thumbs-up' : '';
		iconClasses += this.props.status == 'error' ? ' fa-exclamation-triangle' : '';

		return (
			<div className={classes}>
				{this.props.type == this.props.page &&
				<div className="container">
					<div className="row">
						{(this.props.status == "success" || this.props.status == 'error') && <div className="message col-12"><i className={iconClasses} aria-hidden="true"></i> {this.props.msg}</div>}
					</div>
				</div>}
			</div>
		)
	}
}
