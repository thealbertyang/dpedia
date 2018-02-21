import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import Footer from '../../../../../components/Footer'
import ArticleCard from '../../../../../components/Card/ArticleCard'
import SlideNavbarWrapper from '../../Layouts/SlideNavbarWrapper'
import crudActions from '../../../../../actions/crudActions'
import { ArticlesRelated } from './ArticlesRelated'

import * as htmlToText from 'html-to-text'

let articlesCrudActions = new crudActions('ARTICLES','articles');
let resourcesCrudActions = new crudActions('RESOURCES','resources');


@connect((store) => {
	return {
		articles: store.articles,
		resources: store.resources,
	}
})
export class ArticlesSinglePage extends React.Component {
	constructor(props){
		super(props)
		this.state = { loaded: false };
	}

	componentWillMount(){
		this.props.match.params.slug && this.props.dispatch(articlesCrudActions.get(this.props.match.params.slug));
	}

	componentWillReceiveProps(nextProps, nextState){
		if(!this.state.loaded && nextProps.articles.data !== null){
			this.props.dispatch(resourcesCrudActions.getRelated(nextProps.articles.data.resource_id));
			this.setState({ loaded: true })
		}
	}

	render(){
		let backgroundStyle;

		//console.log(this.props);
		if(this.props.articles.data){
			var text = htmlToText.fromString(this.props.articles.data.body, {
		    	wordwrap: 130
			});

			if(this.props.articles.data.header_img){
				backgroundStyle = this.props.articles.data.header_img !== "" ? { background: 'url(/'+this.props.articles.data.header_img+') center center / cover' } : {};
			}
			else if(this.props.articles.data.resource && this.props.articles.data.resource.header_img){
				backgroundStyle = this.props.articles.data.resource.header_img !== "" ? { background: 'url(/'+this.props.articles.data.resource.header_img+') center center / cover' } : {};
			}
		}
		if(this.props.articles.status == 'fetch_resource_success'){
		return (
			<div className="page articles">
				<SlideNavbarWrapper>
				<div className="body">
					<div className="hero section" style={backgroundStyle}>
					</div>		
					<div className="section section-page-info bg-white">
						<div className="container">
							<div className="row">
								<div className="col-2">
									<div className="avatar" style={{ background: 'url(/'+this.props.articles.data.expert.avatar_img+') center center / cover' }}>
									</div>
									<h6 className="heading">{this.props.articles.data.expert.first_name+' '+this.props.articles.data.expert.last_name}, {this.props.articles.data.expert.credentials}</h6>
									<p>{this.props.articles.data.expert.occupation} - {this.props.articles.data.expert.city}, {this.props.articles.data.expert.state}</p>
								</div>
								<div className="col-6">
									<h6 className="heading">About</h6>
									<p>{this.props.articles.data.expert.about}</p>
								</div>
								<div className="col-4">
									<h6 className="heading">Highlights</h6>
									<p dangerouslySetInnerHTML={{ __html: `${this.props.articles.data.expert.highlights}` }}></p>
								</div>
							</div>
						</div> 
					</div>			
					<div className="section">
						<div className="container">
							<div className="row">
								<div className="col-12 col-md-8">
									<h6 className="heading-sub">November 21, 2015</h6>
									<h1 className="heading">{this.props.articles.data.title}</h1>
									<div className="tags">
										{this.props.articles.data.tags.map((item,index)=>{
											return (
												<span className="tag-item" key={index}>{item.title}</span>
											)
										})}
									</div>
									<div className="article-body" dangerouslySetInnerHTML={{ __html: `${this.props.articles.data.body}` }}>
									</div>
									
								</div>
								<div className="col-12 col-md-4">
									
									<ArticlesRelated
										records={this.props.resources.related && this.props.resources.related.related_by_expert}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer/>
				</SlideNavbarWrapper>
			</div>
		);
		}
		else {
			return null
		}
	}
}

