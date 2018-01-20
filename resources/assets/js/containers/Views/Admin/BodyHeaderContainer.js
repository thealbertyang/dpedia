import React from 'react'
import { Link } from 'react-router-dom'

export class BodyHeaderContainer extends React.Component {
	constructor(props){
		super(props);	
	} 

	render(){
		return (
			<div className="body-header">
				<div className="container">
					<div className="row">
						<div className="col-6 header__title"><h1 className="title">{this.props.title}</h1></div>
						{this.props.type == 'INDEX' && <div className="col-6 d-flex justify-content-end header__actions">
							<Link to={`${this.props.matchUrl}/create`} className="btn btn-primary">Add {this.props.title}</Link>
						</div>}
					</div>
				</div>
			</div>
		)
	}
}
