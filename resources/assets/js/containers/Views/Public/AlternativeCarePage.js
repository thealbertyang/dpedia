import React from 'react';
import { connect } from "react-redux"
import store from "../../../store"
import Footer from '../../../components/Footer'

import ArticleCard from '../../../components/Card/ArticleCard'
import { ResourcesList } from './Layouts/ResourcesList'
import SlideNavbarWrapper from './Layouts/SlideNavbarWrapper'
import * as videosActions from '../../../actions/videosActions'
import * as articlesActions from '../../../actions/articlesActions'
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
export class AlternativeCarePage extends React.Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		this.props.dispatch(articlesActions.crudGetAll('all'));
		this.props.dispatch(pagesCrudActions.get('alternative-care'));
	}

	render(){
		console.log(this.props.articles);

		return (
			<div className="page alternative-care">
				<SlideNavbarWrapper>
				<div className="body">
					<Hero {...this.props.pages.data} />
					<div className="section">
						<div className="container">
							<div className="row text-center">
								<div className="col">
									<h1 className="heading">Alternative Care</h1>
									<h6 className="heading-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
								</div>
							</div>
						</div>
					</div>
					<ResourcesList title="Articles" type="articles" records={this.props.articles.records && 
						this.props.articles.records.filter((item)=>{
							if(item.pages && JSON.parse(item.pages).includes('alternative-care') && item.status == 'published'){
								return item;
							}
						})} />
					<ResourcesList title="Videos" type="videos" records={this.props.videos.records && 
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
