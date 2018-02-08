import React from 'react';
import { connect } from "react-redux"
import store from "../../../store"
import Footer from '../../../components/Footer'

import ArticleCard from '../../../components/Card/ArticleCard'
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
export class LivingWithPage extends React.Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		this.props.dispatch(articlesActions.crudGetAll('all'));
		this.props.dispatch(pagesCrudActions.get('living-with'));
	}

	render(){
		console.log(this.props.articles);

		return (
			<div className="page living-with">
				<SlideNavbarWrapper>
				<div className="body">
					<Hero {...this.props.pages.data} />
					<div className="section">
						<div className="container">
							<div className="row text-center">
								<div className="col">
									<h1 className="heading">Living With Diabetes</h1>
									<h6 className="heading-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
								</div>
							</div>
						</div>
					</div>
					<ResourcesList title="Recent Articles" type="articles" records={this.props.articles.records && 
						this.props.articles.records.filter((item)=>{
							if(item.pages != null && item.pages && JSON.parse(item.pages) && JSON.parse(item.pages).includes('living-with') && item.status == 'published'){
								return item;
							}
						})} />
					<ResourcesList title="Recent Videos" type="videos" records={this.props.videos.records && 
						this.props.videos.records.filter((item)=>{
							console.log('item pages', item.pages)
							if(item.pages != null && item.pages && JSON.parse(item.pages) && JSON.parse(item.pages).includes('living-with') && item.status == 'published'){
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
