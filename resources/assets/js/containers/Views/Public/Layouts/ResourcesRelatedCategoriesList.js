import React from 'react';
import { connect } from "react-redux"
import store from "../../../../store"
import Footer from '../../../../components/Footer'

import ArticleCard from '../../../../components/Card/ArticleCard'
import VideoCard from '../../../../components/Card/VideoCard'
import ReviewCard from '../../../../components/Card/ReviewCard'
import * as articlesActions from '../../../../actions/articlesActions'
import * as htmlToText from 'html-to-text'

export class ResourcesRelatedCategoriesList extends React.Component {
	constructor(props){
		super(props)
		this.state = { count: 8 };
	}

	seeMore = (e) => {
		e.preventDefault(); 
		this.setState({ count: this.state.count + 8});
	}

	render(){
		console.log(this.props);
		return (
			<div className="section section-reviews-category-related">
				<div className={`${(this.props.container && this.props.container == 'regular') ? 'container' : 'container-fluid'}`}>
					<div className="row text-center">
						<div className="col">
							<h3 className="heading">{this.props.header}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h4 className="heading">More In: <span className="highlight">{this.props.title}</span></h4>
							<hr/>
							<div className="row">
								{this.props.records && this.props.records.map((item, index)=>{

									if(index + 1 <= this.state.count){
										return(
											<div className="col-12 col-md-4 col-lg-3" key={index}>
												{this.props.type == 'articles' && <ArticleCard title={item.title} url={`/articles/${item.slug}`} body={item.body} />}
												{this.props.type == 'videos' && <VideoCard title={item.title} url={`/videos/${item.slug}`} body={item.body} description={item.description} video_time={item.video_time}/>}
												{this.props.type == 'reviews' && <ReviewCard title={item.title} url={`/reviews/${item.slug}`} body={item.body} description={item.description} icon_img={item.icon_img} sponsored={item.sponsored} tags={item.tags}/>}
											</div>
										)
									}
								})}
								{this.props.records && this.props.records.length > this.state.count && 
									<div className="col-md-12 mx-auto mt-4 text-center">
										<a href="#" className="see-more" onClick={(e)=>this.seeMore(e)}>See more...</a>
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
