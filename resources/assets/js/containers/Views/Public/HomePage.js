import React from 'react';
import { connect } from "react-redux"
import store from "../../../store"
import Footer from '../../../components/Footer'

import ArticleCard from '../../../components/Card/ArticleCard'
import SlideNavbarWrapper from './Layouts/SlideNavbarWrapper'
import { ResourcesList } from './Layouts/ResourcesList'
import * as videosActions from '../../../actions/videosActions'
import * as articlesActions from '../../../actions/articlesActions'
import * as reviewsActions from '../../../actions/reviewsActions'
import crudActions from '../../../actions/crudActions'
import { Hero } from '../../../components/Hero'


let reviewsCategoriesCrudActions = new crudActions('REVIEWS_CATEGORIES','reviews_categories');
let reviewsCrudActions = new crudActions('REVIEWS','reviews');
let pagesCrudActions = new crudActions('PAGES','pages');
let videosCrudActions = new crudActions('VIDEOS','videos');
let articlesCrudActions = new crudActions('ARTICLES','articles');

@connect((store) => {
	return {
		articles: store.articles,
		videos: store.videos,
		reviews: store.reviews,
		reviews_categories: store.reviews_categories,
		pages: store.pages,
	}
})
export class HomePage extends React.Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		this.props.dispatch(articlesCrudActions.getAll());
		this.props.dispatch(videosCrudActions.getAll());
		this.props.dispatch(reviewsCrudActions.getAll());
		this.props.dispatch(pagesCrudActions.get('home'));

		this.props.dispatch(reviewsCategoriesCrudActions.getAll());
	}

	render(){
		console.log('THIS PROPPERS', this.props)
		return (
			<div className="page home">
				<SlideNavbarWrapper>
				<div className="body">
					<div className="section">
						<div className="container">
							<div className="row text-center">
								<div className="col">
									<h1 className="heading">Welcome to Real Doctors</h1>
									<h5 className="heading-sub">Providing Doctor-Vetted Resources That Users Can Trust.</h5>
								</div>
							</div>
						</div>
					</div>
					<Hero {...this.props.pages.data} />
					<ResourcesList title="Recent Articles" type="articles" records={this.props.articles.records && 
						this.props.articles.records.filter((item)=>{
							if(item.status == 'published'){
								return item;
							}
						})} />
					<ResourcesList title="Recent Videos" type="videos" records={this.props.videos.records && 
						this.props.videos.records.filter((item)=>{
							if(item.status == 'published'){
								return item;
							}
						})} />
					{this.props.reviews.records &&
					<ResourcesList 
						title="Recent Reviews" 
						type="reviews" 
						records={this.props.reviews.records.filter((item)=>{
							if(item.status == 'published'){
								return item;
							}
						})}
						category_records={this.props.reviews_categories.records}
					/>
					}
				</div>
				<Footer/>
				</SlideNavbarWrapper>
			</div>
		);
	}
}
