import React from "react"
import { connect } from "react-redux"
import store from "../../store"
import { login, logout, clearStatus, checkToken } from '../../actions/authActions'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { HomePage } from "../Views/Public/HomePage";
import { CuriousAboutPage } from "../Views/Public/CuriousAboutPage";
import { LivingWithPage } from "../Views/Public/LivingWithPage";
import { PreventiveCarePage } from "../Views/Public/PreventiveCarePage";
import { AlternativeCarePage } from "../Views/Public/AlternativeCarePage";
import { ReviewsSinglePage } from "../Views/Public/Pages/Reviews/ReviewsSinglePage";
import { ExpertsListPage } from "../Views/Public/Pages/Experts/ExpertsListPage";
import { ExpertsSinglePage } from "../Views/Public/Pages/Experts/ExpertsSinglePage";
import { SearchPage } from "../Views/Public/Pages/Search/SearchPage";
import { ReviewsSearchPage } from "../Views/Public/Pages/Reviews/ReviewsSearchPage";
import { VideosSinglePage } from "../Views/Public/Pages/Videos/VideosSinglePage";

import { ArticlesSinglePage } from "../Views/Public/Pages/Articles/ArticlesSinglePage";



import { LoginPage } from "../Views/Admin/LoginPage";

import { AdminRoutes } from "./admin";

import axios from 'axios'
import Cookies from 'universal-cookie';

import ReactGA from 'react-ga';
import GoogleAnalytics from '../GoogleAnalytics';

@connect(
	(store) => { 
	return {
		auth: store.auth.authenticated,
		status: store.auth.status
	}
})
export default class Routes extends React.Component {
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
						<Route exact path='/' component={HomePage} />

						<Route path='/articles/:slug' component={ArticlesSinglePage} />
						<Route path='/videos/:slug' component={VideosSinglePage} />
						<Route path='/curious-about' component={CuriousAboutPage} />
						<Route path='/living-with' component={LivingWithPage} />
						<Route path='/preventive-care' component={PreventiveCarePage} />
						<Route path='/alternative-care' component={AlternativeCarePage} />
						<Route path='/reviews/:slug' component={ReviewsSinglePage} />
						<Route path='/experts' exact component={ExpertsListPage} />
						<Route path='/experts/:slug' component={ExpertsSinglePage} />

						<Route path='/search/' exact component={SearchPage} />
						<Route path='/search/:search' component={SearchPage} />
						<Route path='/search?type=articles' component={SearchPage} />

						<Route path='/reviews' exact component={ReviewsSearchPage} />
						<Route path='/reviews/search/:search' component={ReviewsSearchPage} />

						<Route path='/login' component={LoginPage} />
						<Route path='/admin' component={AdminRoutes} />
					</Switch>}

				</Switch>
			</Router>
		);
	}
}
