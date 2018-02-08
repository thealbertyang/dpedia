import React from 'react';
import { connect } from "react-redux"
import store from "../../../../store"
import Footer from '../../../../components/Footer'

import ArticleCard from '../../../../components/Card/ArticleCard'
import VideoCard from '../../../../components/Card/VideoCard'
import ReviewCard from '../../../../components/Card/ReviewCard'
import * as articlesActions from '../../../../actions/articlesActions'
import * as htmlToText from 'html-to-text'

export class ResourcesSearchList extends React.Component {
	constructor(props){
		super(props)
		this.state = { count: 8 };
	}

	seeMore = (e) => {
		e.preventDefault(); 
		this.setState({ count: this.state.count + 8});
	}

	render(){
		//console.log(this.props);

		let resources = this.props.records; 

		console.log('resources', resources, resources && resources.length, this.state.count, resources && resources.length > this.state.count)
		return (
			<div className="section">
				<div className={`${(this.props.container && this.props.container == 'regular') ? 'container' : 'container-fluid'}`}>
					<div className="row text-center">
						<div className="col">
							<h3 className="heading">{this.props.header}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="row card-deck">
								{resources && resources.map((item, index)=>{
									if(index + 1 <= this.state.count){
										return(
											<div className="card-col col-12 col-md-4 col-lg-3" key={index}>
												{item.resourceable_type == 'App\\Review' && <ReviewCard layout="full" {...item} />}
												{item.resourceable_type == 'App\\Article' && <ArticleCard {...item} />}
												{item.resourceable_type == 'App\\Video' && <VideoCard {...item} />}
											</div>
										)
									}
								})}
								{resources && resources.length > this.state.count && 
									<div className="col-md-12 mx-auto mt-4 text-center">
										<a href="#" className="see-more" onClick={(e)=>this.seeMore(e)}>See more <i className="fa fa-play"></i></a>
									</div>
								}
							</div>									
						</div>
					</div>
				</div>
			</div>
		);
	}
}
