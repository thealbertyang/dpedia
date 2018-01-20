import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import Footer from '../../../../../components/Footer'
import SlideNavbarWrapper from '../../Layouts/SlideNavbarWrapper'
import crudActions from '../../../../../actions/crudActions'
import { ResourcesList } from '../../Layouts/ResourcesList'

let expertsCrudActions = new crudActions('EXPERTS','experts');
let articlesCrudActions = new crudActions('ARTICLES','articles');
let videosCrudActions = new crudActions('VIDEOS','videos');

@connect((store) => {
	return {
		experts: store.experts,
		articles: store.articles,
		videos: store.videos,
	}
})
export class ExpertsSinglePage extends React.Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		this.props.match.params.slug && this.props.dispatch(expertsCrudActions.get(this.props.match.params.slug));
		this.props.dispatch(articlesCrudActions.getAll());
		this.props.dispatch(videosCrudActions.getAll());
	}

	render(){
		if(this.props.experts.status == 'fetch_resource_success'){
		return (
			<div className="page expert">
				<SlideNavbarWrapper>
				<div className="body">
					<div className="hero section">
					</div>		
					<div className="section section-page-info bg-white">
						<div className="container">
							<div className="row">
								<div className="col-2">
									<div className="avatar" style={{ background: 'url(/'+this.props.experts.data.avatar_img+') center center / cover' }}>
									</div>
									<h6 className="heading">{this.props.experts.data.first_name+' '+this.props.experts.data.last_name}, {this.props.experts.data.credentials}</h6>
									<p>{this.props.experts.data.occupation} - {this.props.experts.data.city}, {this.props.experts.data.state}</p>
								</div>
								<div className="col-6">
									<h6 className="heading">About</h6>
									<p>{this.props.experts.data.about}</p>
								</div>
								<div className="col-4">
									<h6 className="heading">Highlights</h6>
									<p>{this.props.experts.data.highlights}</p>
								</div>
							</div>
						</div>
					</div>			
					<div className="section">
						<div className="container">
							<div className="row text-center">
								<div className="col">
									<h1 className="heading">Recent Content by Dr. S Alpert</h1>
									<h6 className="heading-sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h6>
								</div>
							</div>
						</div>
					</div>
					<ResourcesList title="Recent Articles" type="articles" records={this.props.articles.records && 
						this.props.articles.records.filter((item)=>{
							if(item.pages && JSON.parse(item.pages).includes('living-with') && item.status == 'published' && item.expert.id == this.props.experts.data.id){
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
		else {
			return null
		}
	}
}

