import React from 'react'

export class BodyContentContainer extends React.Component {
	constructor(props){
		super(props);	
	} 

	render(){
		return (
			<div className="body-content">	 
				<div className="container">
					<div className="row">
						<div className="col-12">
				            {this.props.children}
			            </div>
			        </div>
				</div> 
	        </div>
		)
	}
}
