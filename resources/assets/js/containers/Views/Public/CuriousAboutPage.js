import React from 'react';
import { connect } from "react-redux"
import store from "../../../store"
import Footer from '../../../components/Footer'

import { ResourcesList } from './Layouts/ResourcesList'
import SlideNavbarWrapper from './Layouts/SlideNavbarWrapper'
import * as articlesActions from '../../../actions/articlesActions'
import * as videosActions from '../../../actions/videosActions'
import crudActions from '../../../actions/crudActions'

import { Hero } from '../../../components/Hero'

let pagesCrudActions = new crudActions('PAGES','pages');

@connect((store) => {
	return {
		articles: store.articles,
		videos: store.videos,
		pages: store.pages,
	}
})
export class CuriousAboutPage extends React.Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		this.props.dispatch(articlesActions.crudGetAll('all'));
		this.props.dispatch(videosActions.crudGetAll('all'));
		this.props.dispatch(pagesCrudActions.get('curious-about'));
	}

	render(){
		console.log(this.props.articles);

		return (
			<div className="page curious-about">
				<SlideNavbarWrapper>
				<div className="body">
					<Hero {...this.props.pages.data} />
					<div className="section">
						<div className="container">
							<div className="row text-center">
								<div className="col">
									<h1 className="heading">Curious About Diabetes?</h1>
									<h6 className="heading-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
								</div>
							</div>
						</div>
					</div>
					<ResourcesList title="Recent Articles" type="articles" records={this.props.articles.records && 
						this.props.articles.records.filter((item)=>{
							if(item.pages && JSON.parse(item.pages).includes('curious-about') && item.status == 'published'){
								return item;
							}
						})} />
					<ResourcesList title="Recent Videos" type="videos" records={this.props.videos.records && 
						this.props.videos.records.filter((item)=>{
							if(item.pages && JSON.parse(item.pages).includes('curious-about') && item.status == 'published'){
								return item;
							}
						})} />
				</div>
				<Footer/>
				</SlideNavbarWrapper>
			</div>
		);
	}
}
