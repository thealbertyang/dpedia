import React from "react"
import { connect } from "react-redux"
import store from "../store"
import { login, logout, clearStatus, checkToken } from '../actions/authActions'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { HomePage } from "../components/pages/HomePage";
import { HomePageDos } from "../components/pages/HomePageDos";
import { AboutPage } from "../components/pages/AboutPage";
import { DoctorsPage } from "../components/pages/DoctorsPage";
import { FeedbackPage } from "../components/pages/FeedbackPage";
import { ResourcesCreatePage } from "../components/pages/ResourcesCreatePage";
import { ResourcesPage } from "../components/pages/ResourcesPage";

import { LoginPage } from "../components/LoginPage";

import { DashboardContainer } from "../components/DashboardContainer";

import axios from 'axios'
import Cookies from 'universal-cookie';

import ReactGA from 'react-ga';
import withTracker from './withTracker';

@connect(
	(store) => { 
	return {
		auth: store.auth.authenticated,
		status: store.auth.status
	}
})
export default class AppRouter extends React.Component {
	constructor(props){ 
		super(props);
	} 

	componentWillReceiveProps(nextProps){

	}

	componentWillMount(){
		const cookies = new Cookies();
		if(cookies.get('isLoggedIn') !== 'true'){
			if(prompt("Please enter password") == 'doctorpedia123'){
				let d = new Date();
  				d.setTime(d.getTime() + (700*60*1000));
				cookies.set('isLoggedIn', 'true', {path: "/", expires: d});
			}
		}
	}

	componentDidMount(){
		//If we mounted then change status to loaded
		if(this.props.status == 'loading'){
			this.props.dispatch(checkToken());
		}
		if(this.props.status == 'auth_token_error'){
			this.props.dispatch(logout());
		}
	}
	componentDidUpdate(){
		if(this.props.status == 'auth_token_error'){
			this.props.dispatch(logout());
		}
	}

	render() {
		const cookies = new Cookies();
		let weakLoggedIn = (cookies.get('isLoggedIn') == 'true');

		return (
			<Router>
				<Switch>

					{weakLoggedIn == true &&
					<Switch>
						<Route exact path='/' component={withTracker(HomePage)} />
						<Route exact path='/dos' component={HomePageDos} />

						<Route path='/about' component={withTracker(AboutPage)} />
						<Route path='/feedback' component={withTracker(FeedbackPage)} />
						<Route path='/doctors' component={withTracker(DoctorsPage)} />

						<Route path='/resources' exact component={withTracker(ResourcesPage)} />
						<Route path='/resources-create' exact component={withTracker(ResourcesCreatePage)} />
						<Route path='/resources/:category/:slug' exact component={withTracker(ResourcesPage)} />
						
						<Route path='/login' render={(props)=> <LoginPage loggedInPath="/dashboard" {...props} />}/>
						<Route path='/dashboard' component={DashboardContainer} />
					</Switch>}

				</Switch>
			</Router>
		);
	}
}
