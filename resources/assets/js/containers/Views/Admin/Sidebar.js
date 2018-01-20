import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../../../actions/authActions'
import { connect } from "react-redux"
import * as config from '../../../config'
@connect(
	(store) => {
	return {
		auth: store.auth,
		status: store.auth.status
	}
})
export default class Sidebar extends React.Component { 
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
	}
	logout(){
	    this.props.dispatch(logout());
	}
	render(){
		console.log('SIDEBAR PROPS', this.props)
		return (
			<div className="sidebar">
				<div className="sidebar__logo">
					<NavLink exact to="/dashboard"><img src="/img/logo_doctorpedia_white.svg" className="logo" /></NavLink>
				</div>
				<ul className="nav nav-pills flex-column">
					{config.ADMIN.ROUTES.map((route, index)=>{

						console.log((!route.roles), route.roles);
						//if there is a route['role'] then check if role has access before placing
						if((!route.roles) || (route.roles && route.roles.includes(this.props.auth.role))){
							return (
									<li className="nav-item" key={index}>
						  			<NavLink to={`${config.ADMIN.DIR}/${route.slug}`} className="nav-link"><i className={`fa ${route.icon}`}></i> <span>{route.title}</span></NavLink>
								</li>
							)
						}
					})}

					<li className="nav-item">
						<a className="dropdown-item" href="#" onClick={this.logout} className="nav-link"><i className="fa fa-power-off"></i> <span>Logout</span></a>
					</li>
				</ul>
			</div>
		)
	}
}