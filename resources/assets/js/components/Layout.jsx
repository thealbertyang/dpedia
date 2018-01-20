import React from "react"
import { connect } from "react-redux"
import store from "../store"
import { login } from '../actions/authActions'
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

import axios from 'axios'
import Cookies from 'universal-cookie';

@connect(
	(store) => { console.log("Layout Connected Store: ",store);
	return {
		auth: {
			authenticated: store.auth.authenticated
		}
	}
})
export default class Layout extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object,
		location: React.PropTypes.object
	}
	constructor(props){
		super(props);
		this.test = this.test.bind(this);

		console.log("---- CHECKING TOKEN ----");
    	const cookies = new Cookies();
    	console.log(cookies.get('token'));
		axios.get('/api/user?token='+cookies.get('token')).then((response) => {
			if(typeof response.data.user !== 'undefined'){
				this.props.dispatch(login(response.data.user.email));
			}
		});
	}

	componentWillMount(){


	}

	componentDidMount(){

	}
	componentDidUpdate(){
		console.log("Layout Did Updated: ",this.props);
		console.log(this.props.auth.authenticated)
	}

	test(){
		
		console.log("Layout Tested: ", this.props);
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
					<Route path='/login' render={(props)=><LoginPage test={this.test}/>} />
					<Route path='/dashboard' render={(props)=><DashboardPage test={this.test}/>} />
					<Route path='/users' component={UsersPage} />
				</div>
			</Router>
		);
	}
}
