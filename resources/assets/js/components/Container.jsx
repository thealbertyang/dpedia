import React from "react"
import { connect } from "react-redux"
import store from "../store"
import { login, loggedIn } from '../actions/authActions'
import { BrowserRouter as Router, Route, NavLink, Link, Switch } from "react-router-dom";

import AuthController from "../components/AuthController";

import Navbar from "../components/Navbar";
import { HomePage } from "../components/HomePage";
import { AboutPage } from "../components/AboutPage";
import { BlogPage } from "../components/BlogPage";
import { LoginPage } from "../components/LoginPage";
import { DashboardPage } from "../components/DashboardPage";
import UsersPage from "../components/UsersPage";
import Modal from '../components/Modal'

import PrivateRoute from '../components/PrivateRoute';

import axios from 'axios'
import Cookies from 'universal-cookie';

@connect(
	(store) => { 
	return {
		auth: {
			authenticated: store.auth.authenticated
		}
	}
})
export default class Container extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object,
		location: React.PropTypes.object
	}
	constructor(props){
		super(props);
		console.log("test");
	}

	componentWillMount(){
		//Hey are we logged in? If not then leave loading screen on
		this.props.dispatch(loggedIn());
	}

	componentDidMount(){
		//Hey are we logged in? If not then leave loading screen on
	}
	componentDidUpdate(){
		//Hey are we logged in? If not then leave loading screen on
		/*
							<Route path='/login' render={(props)=><LoginPage test={this.test}/>} />
					<Route path='/dashboard' render={(props)=><DashboardPage test={this.test}/>} />
					*/
	}

	render() {
		const links = [
			{'url': '/', 'title': 'Home', 'component': HomePage },
			{'url': '/blog', 'title': 'Blog', 'component': BlogPage },
			{'url': '/about', 'title': 'About', 'component': AboutPage},
			{'url': '/login', 'title': 'Login', 'component': LoginPage},
			{'url': '/dashboard', 'title': 'Dashboard', 'component': DashboardPage, 'member': true},
		];


		return (
			<Router>
				<div id="app">
					<Navbar links={links}/>
					<Route exact path='/' component={HomePage} />
					<Route path='/about' component={AboutPage} />
					<Route path='/blog' component={BlogPage} />
					<Route path='/login' component={LoginPage} />
					<Route path='/dashboard' component={DashboardPage} authenticated={this.props.authenticated} />
					<Route path='/users' component={UsersPage} />
				</div>
			</Router>
		);
	}
}
