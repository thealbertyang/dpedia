import React from 'react'

export default class Modal extends React.Component {


	constructor(props){
		super(props);
	}
	componentWillMount(){
	}
	render(){
		return (
			<div className="modal fade" style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: '100vh', zIndex: 10000, position: 'fixed', display: this.props.isOpen ? 'block':'none', opacity: this.props.isOpen ? '1':'0' }}>
				{this.props.children}
			</div>
		)
	}
}