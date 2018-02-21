import React from 'react';
import { connect } from "react-redux"
import store from "../../../store"
import Footer from '../../../components/Footer'

import { ResourcesList } from './Layouts/ResourcesList'
import SlideNavbarWrapper from './Layouts/SlideNavbarWrapper'
import * as articlesActions from '../../../actions/articlesActions'
import * as videosActions from '../../../actions/videosActions'
import crudActions from '../../../actions/crudActions'
import { ReviewsSearchResults } from './Pages/Reviews/ReviewsSearchResults'

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
export class CuriousAboutPage extends React.Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		this.props.dispatch(articlesCrudActions.getAll());
		this.props.dispatch(videosCrudActions.getAll());
		this.props.dispatch(reviewsCrudActions.getAll());
		this.props.dispatch(pagesCrudActions.get('curious-about'));

		this.props.dispatch(reviewsCategoriesCrudActions.getAll());
	}

	render(){
		console.log(this.props.articles);

		return (
			<div className="page curious-about">
				<SlideNavbarWrapper>
				<div className="body">
					<Hero {...this.props.pages.data} />
					<div className="section section-main">
						<div className="container-fluid">
							<div className="row text-center">
								<div className="col">
									<h1 className="heading mb-5 mb-md-3">Curious About Diabetes?</h1>
									<h6 className="heading-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
								</div>
							</div>
						</div>
					</div>
					<div className="section py-0">
						<div className="container-fluid">
							<div className="row">
								<div className="col-12 d-flex justify-content-center tester">
									<img src={`/img/test-top.jpg`} className="tester-main"/>
								</div>
							</div>
						</div>
					</div>
					<div className="container-fluid">
							<div className="row no-gutters">
								<div className="tester col-md-10 col-12 d-flex flex-column align-items-center">
									<ResourcesList title="Recent Articles" type="articles" records={this.props.articles.records && 
										this.props.articles.records.filter((item)=>{
											if(item.pages != null && item.pages && JSON.parse(item.pages) && JSON.parse(item.pages).includes('curious-about') && item.status == 'published'){
												return item;
											}
										})} />
									<img src={`/img/test-side-first.jpg`} className="tester-main-first" />
									<ResourcesList title="Recent Videos" type="videos" records={this.props.videos.records && 
										this.props.videos.records.filter((item)=>{
											if(item.pages != null && item.pages && JSON.parse(item.pages) && JSON.parse(item.pages).includes('curious-about') && item.status == 'published'){
												return item;
											}
										})} />
									<img src={`/img/test-side-second.jpg`} className="tester-main-second" />
									{this.props.reviews.records && this.props.reviews_categories.records && <ReviewsSearchResults 
										header="Read Reviews on Diabetes Resources"
										title="Recent Reviews"
										records={this.props.reviews.records && this.props.reviews.records.filter((item)=>{
											if(item.status == 'published'){
												//
												return item;
											}
										})}
										category_records={this.props.reviews_categories.records}
									/>}
								</div>
								<div className="col-md-2 tester">
									<img src={`/img/test-side-first.jpg`} className="full-width tester-side-first" />
									<img src={`/img/test-side-second.jpg`} className="full-width tester-side-second" style={{ marginTop: '10rem' }} />
								</div>
							</div>
					</div>
				</div>
				<Footer/>
				</SlideNavbarWrapper>
			</div>
		);
	}
}
