import React from 'react'

import * as config from '../../../config'
import { AdminContainer } from './AdminContainer'
import { BodyContentContainer } from './BodyContentContainer'
import { BodyHeaderContainer } from './BodyHeaderContainer'
import { Messages } from './Messages'

export class IndexCreateEditContainer extends React.Component { 
	constructor(props){
		super(props);	
	} 

	render(){
		return (
			<AdminContainer>
		        <div className="body">
					<BodyHeaderContainer type={this.props.type} title={this.props.title} matchUrl={this.props.matchUrl} />
					<Messages type={this.props.type} />
					<BodyContentContainer>
					    {this.props.children}
					</BodyContentContainer>
		        </div>
			</AdminContainer>
		)
	}
}
