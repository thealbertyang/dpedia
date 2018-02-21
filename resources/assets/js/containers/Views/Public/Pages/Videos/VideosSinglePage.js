import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import Footer from '../../../../../components/Footer'
import { ResourcesList } from '../../Layouts/ResourcesList'
import ArticleCard from '../../../../../components/Card/ArticleCard'
import SlideNavbarWrapper from '../../Layouts/SlideNavbarWrapper'

import crudActions from '../../../../../actions/crudActions'

let videosCrudActions = new crudActions('VIDEOS','videos');

import * as htmlToText from 'html-to-text'

@connect((store) => {
	return {
		videos: store.videos,
	}
})
export class VideosSinglePage extends React.Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		this.props.match.params.slug && this.props.dispatch(videosCrudActions.get(this.props.match.params.slug))
		this.props.dispatch(videosCrudActions.getRelated(this.props.match.params.slug));
	}

	render(){
		console.log(this.props);
		if(this.props.videos.data){
			var text = htmlToText.fromString(this.props.videos.data.body, {
		    	wordwrap: 130
			});
			console.log(text);
		}
		if(this.props.videos.status == 'fetch_resource_success' || this.props.videos.status == 'fetch_resource_related_success'){
		return (
			<div className="page video">
				<SlideNavbarWrapper>
				<div className="body">
					<div className="embed-responsive embed-responsive-16by9" dangerouslySetInnerHTML={{ __html: `${this.props.videos.data.video_html}` }}>
					</div>
					<div className="section">
						<div className="container">
							<div className="row">
								<div className="col-12 col-md-8 order-2 order-lg-1">
									<h6 className="heading-sub">November 21, 2015</h6>
									<h1 className="heading">{this.props.videos.data.title}</h1>

									<div className="tags">
										{this.props.videos.data.tags.map((item,index)=>{
											return (
												<span className="tag-item" key={index}>{item.title}</span>
											)
										})}
									</div>
									<div className="" dangerouslySetInnerHTML={{ __html: `${this.props.videos.data.description}` }}>
									</div>
									
								</div>
								<div className="col-12 col-md-4 order-1 order-lg-2">
									<div className="row">	
										<div className="col-4">
											<div className="avatar" style={{ background: 'url(/'+this.props.videos.data.expert.avatar_img+') center center / cover' }}>
											</div>
										</div>
										<div className="col-8 d-flex flex-column justify-content-center align-items-start">
											<h6 className="heading">{this.props.videos.data.expert.first_name+' '+this.props.videos.data.expert.last_name}, {this.props.videos.data.expert.credentials}</h6>
											<p>{this.props.videos.data.expert.occupation} - {this.props.videos.data.expert.city}, {this.props.videos.data.expert.state}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<ResourcesList title="Related Videos" type="videos" container="regular" records={this.props.videos.related && 
						this.props.videos.related.related_shuffle.filter((item)=>{
							if(item.pages && item.status == 'published'){
								return item;
							}
						})} />
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

