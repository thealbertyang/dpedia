import React from "react"
import { connect } from "react-redux"
import store from "../../store"
import Cookies from 'universal-cookie';
import { Route, Switch, withRouter } from "react-router-dom";

import { UsersPage, UsersCreateEditPage } from "../Views/Admin/Users";
import { ArticlesPage, ArticlesCreateEditPage } from "../Views/Admin/Articles";
import { ResourcesPage, ResourcesCreateEditPage } from "../Views/Admin/Resources";
import { VideosPage, VideosCreateEditPage } from "../Views/Admin/Videos";
import { ReviewsPage, ReviewsCreatePage, ReviewsUpdatePage } from "../Views/Admin/Reviews";
import { ReviewsCategoriesPage, ReviewsCategoriesCreatePage, ReviewsCategoriesUpdatePage } from "../Views/Admin/ReviewsCategories";
import { PlaylistsPage, PlaylistsCreatePage, PlaylistsUpdatePage } from "../Views/Admin/Playlists";
import { PagesPage, PagesCreatePage, PagesUpdatePage } from "../Views/Admin/Pages";
import { ExpertsPage, ExpertsCreatePage, ExpertsUpdatePage } from "../Views/Admin/Experts";

@connect(
	(store) => {
	return {
		auth: store.auth,
		status: store.auth.status
	}
})
export class AdminRoutes extends React.Component {
	constructor(props){
		super(props);

	}
	componentDidMount(){
		if(this.props.status == 'logout' || this.props.status == 'auth_token_error'){
			window.location.href = '/login';
		}
	}
	
	componentDidUpdate(){
		if(this.props.status == 'logout' || this.props.status == 'auth_token_error'){
			window.location.href = '/login';
		}
	}

	render(){
		//console.log('ADMIN ROuTE PROPS', this.props)
		return (
			<Switch>

				<Route path={`${this.props.match.url}`} exact component={UsersPage} />

				{this.props.auth && this.props.auth.role == 'admin' && <Route path={`${this.props.match.url}/users`} exact render={(props)=> { return (<UsersPage type="INDEX" {...props} />) }} />}
				{this.props.auth && this.props.auth.role == 'admin' && <Route path={`${this.props.match.url}/users/create`} exact render={(props)=> { return (<UsersCreateEditPage type="CREATE" {...props} />) }} />}
				{this.props.auth && this.props.auth.role == 'admin' && <Route path={`${this.props.match.url}/users/:id/edit`} exact render={(props)=> { return (<UsersCreateEditPage type="EDIT" {...props} />) }} />}

				<Route path={`${this.props.match.url}/resources`} exact render={(props)=> { return (<ResourcesPage type="INDEX" {...props} />) }} />
				<Route path={`${this.props.match.url}/resources/create`} exact render={(props)=> { return (<ResourcesCreateEditPage type="CREATE" {...props} />) }} />
				<Route path={`${this.props.match.url}/resources/:id/edit`} exact render={(props)=> { return (<ResourcesCreateEditPage type="EDIT" {...props} />) }} />

				<Route path={`${this.props.match.url}/articles`} exact render={(props)=> { return (<ArticlesPage type="INDEX" {...props} />) }} />
				<Route path={`${this.props.match.url}/articles/create`} exact render={(props)=> { return (<ArticlesCreateEditPage type="CREATE" {...props} />) }} />
				<Route path={`${this.props.match.url}/articles/:id/edit`} exact render={(props)=> { return (<ArticlesCreateEditPage type="EDIT" {...props} />) }} />
				
				<Route path={`${this.props.match.url}/videos`} exact render={(props)=> { return (<VideosPage type="INDEX" {...props} />) }} />
				<Route path={`${this.props.match.url}/videos/create`} exact render={(props)=> { return (<VideosCreateEditPage type="CREATE" {...props} />) }} />
				<Route path={`${this.props.match.url}/videos/:id/edit`} exact render={(props)=> { return (<VideosCreateEditPage type="EDIT" {...props} />) }} />
				
				<Route path={`${this.props.match.url}/reviews`} exact component={ReviewsPage} />
				<Route path={`${this.props.match.url}/reviews/create`} exact component={ReviewsCreatePage} />
				<Route path={`${this.props.match.url}/reviews/:id/edit`} exact component={ReviewsUpdatePage} />		

				<Route path={`${this.props.match.url}/reviews-categories`} exact component={ReviewsCategoriesPage} />
				<Route path={`${this.props.match.url}/reviews-categories/create`} exact component={ReviewsCategoriesCreatePage} />
				<Route path={`${this.props.match.url}/reviews-categories/:id/edit`} exact component={ReviewsCategoriesUpdatePage} />

				<Route path={`${this.props.match.url}/playlists`} exact component={PlaylistsPage} />
				<Route path={`${this.props.match.url}/playlists/create`} exact component={PlaylistsCreatePage} />
				<Route path={`${this.props.match.url}/playlists/:id/edit`} exact component={PlaylistsUpdatePage} />
				
				<Route path={`${this.props.match.url}/pages`} exact component={PagesPage} />
				<Route path={`${this.props.match.url}/pages/create`} exact component={PagesCreatePage} />
				<Route path={`${this.props.match.url}/pages/:id/edit`} exact component={PagesUpdatePage} />

				{this.props.auth && (this.props.auth.role == 'admin' || this.props.auth.role == 'expert') && <Route path={`${this.props.match.url}/experts`} exact component={ExpertsPage} />}
				{this.props.auth && (this.props.auth.role == 'admin' || this.props.auth.role == 'expert') && <Route path={`${this.props.match.url}/experts/create`} exact component={ExpertsCreatePage} />}
				{this.props.auth && (this.props.auth.role == 'admin' || this.props.auth.role == 'expert') && <Route path={`${this.props.match.url}/experts/:id/edit`} exact component={ExpertsUpdatePage} />}
			</Switch>
		);	
	}
}

