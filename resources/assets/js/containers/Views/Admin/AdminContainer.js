import React from 'react'
import Sidebar from './Sidebar'

export class AdminContainer extends React.Component {
	constructor(props){
		super(props);	
	} 

	render() {
		return (
			<div className="admin">
			      	<div className="admin__container">
				        <Sidebar/>
				        {this.props.children}
			        </div>
			</div>
		)
	}
}
