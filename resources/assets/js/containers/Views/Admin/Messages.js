import React from 'react'
import { connect } from "react-redux"
import { modalAddUserToggle, getUsers, submitForm, updateUser, deleteUser, modalEditUserToggle } from '../../../actions/usersActions'
import { Link } from 'react-router-dom'

@connect((store) => {
	return {
		message: store.message,
	}
})
export class Messages extends React.Component {
	constructor(props){
		super(props);	
	} 

	componentWillMount(){
		console.log(this.props)
	}

	componentDidUpdate(){
		console.log(this.props)
	}

	render(){

		if(this.props.message && (this.props.message.status == 'success' || this.props.message.status == 'error') && (this.props.message.action == 'update' || this.props.message.action == 'submit')){
			let classes = 'page-msg';
			classes += this.props.message.status == 'success' ? ' has-success' : '';
			classes += this.props.message.status == 'error' ? ' has-danger' : '';

			let iconClasses = 'fa';
			iconClasses += this.props.message.status == 'success' ? ' fa-thumbs-up' : '';
			iconClasses += this.props.message.status == 'error' ? ' fa-exclamation-triangle' : '';

			return (

						<div className={classes}>
							{this.props.type == this.props.message.page &&
							<div className="container">
								<div className="row">
									<div className="message col-12"><i className={iconClasses} aria-hidden="true"></i> {this.props.message.message}</div>
								</div>
							</div>}
						</div>
					
				)
		}
		else {
			return null;
		}
	}
}
