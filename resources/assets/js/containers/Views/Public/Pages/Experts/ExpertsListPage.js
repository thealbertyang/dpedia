import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import Footer from '../../../../../components/Footer'
import SlideNavbarWrapper from '../../Layouts/SlideNavbarWrapper'
import crudActions from '../../../../../actions/crudActions'

let expertCrudActions = new crudActions('EXPERTS','experts');

@connect((store) => {
	return {
		experts: store.experts,
	}
})
export class ExpertsListPage extends React.Component {
	constructor(props){
		super(props)
	}

	componentWillMount(){
		this.props.dispatch(expertCrudActions.getAll());
	}

	render(){
		console.log(this.props);

		if(this.props.experts.status == 'fetch_resources_success'){
		return (
			<div className="page experts">
				<SlideNavbarWrapper>
				<div className="body">
					<div className="section pb-0">
						<div className="container">
							<div className="row">
								<div className="col-12">
									<h1 className="heading text-center">Meet Our Experts</h1>
								</div>
							</div>
						</div>
					</div>
					<div className="section">
						<div className="container">
							{this.props.experts.records.map((expert)=>{
								return (
									<div className="row">
										<div className="experts-panel col-12 bg-white">
											<div className="row">
												<div className="col-3 d-flex align-items-center flex-column">
													<div className="avatar " style={{ background: 'url('+expert.avatar_img+')'}}>
													</div>
													<h5 className='heading'>Dr. {expert.first_name+' '+expert.last_name+', '+expert.credentials}</h5>
													<a href={'/experts/'+expert.user.username}>See Expert Profile</a>
												</div>
												<div className="col-9 d-flex flex-column justify-content-center">
													<span className="heading">About</span>
													<p>{expert.about}</p>
													<a href={'/experts/'+expert.user.username}>See Expert Profile</a>
													<span className="heading">Highlights</span>
													<p>{expert.highlights}</p>
												</div>
											</div>
										</div>
									</div>
								);
							})}

							{/*<div className="row">
								<div className="col-2">
									<div className="avatar" style={{ background: 'url(/'+this.props.experts.avatar_img+') center center / cover' }}>
									</div>
									<h6 className="heading">{this.props.experts.first_name+' '+this.props.experts.last_name}, {this.props.experts.credentials}</h6>
									<p>{this.props.experts.occupation} - {this.props.experts.city}, {this.props.experts.state}</p>
								</div>
								<div className="col-6">
									<h6 className="heading">About</h6>
									<p>{this.props.experts.about}</p>
								</div>
								<div className="col-4">
									<h6 className="heading">Highlights</h6>
									<p>{this.props.experts.highlights}</p>
								</div>
							</div>*/}
						</div>
					</div>			
					{/*<div className="section">
						<div className="container">
							<div className="row">
								<div className="col-8">
									<h6 className="heading-sub">November 21, 2015</h6>
									<h1 className="heading">{this.props.articles.data.title}</h1>
									<div className="tags">
										{this.props.articles.data.tags.map((item,index)=>{
											return (
												<span className="tag-item" key={index}>{item.title}</span>
											)
										})}
									</div>
									<div className="" dangerouslySetInnerHTML={{ __html: `${this.props.articles.data.body}` }}>
									</div>
									
								</div>
								<div className="col-4">
									<p>Ads</p>
								</div>
							</div>
						</div>
					</div>*/}
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

