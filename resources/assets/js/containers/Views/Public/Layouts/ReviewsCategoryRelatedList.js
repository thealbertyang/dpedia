import React from 'react';
import { connect } from "react-redux"
import store from "../../../../store"
import Footer from '../../../../components/Footer'

import ArticleCard from '../../../../components/Card/ArticleCard'
import VideoCard from '../../../../components/Card/VideoCard'
import ReviewCard from '../../../../components/Card/ReviewCard'
import * as articlesActions from '../../../../actions/articlesActions'
import * as htmlToText from 'html-to-text'

export class CategoryRelatedList extends React.Component {
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
				<div className={`${(this.props.container && this.props.container == 'regular') ? 'container' : 'container-fluid p-0'}`}>
					<div className="row">
						<div className="col-12">
							<h4 className="heading">More In: <span className="highlight">{this.props.title}</span></h4>
							<div className="row">
								{this.props.records && this.props.records.map((item, index)=>{

									if(index + 1 <= this.state.count){
										return(
											<div className="col-12" key={index}>
												{this.props.type == 'reviews' && <ReviewCard title={item.title} slug={item.slug} url={item.url} body={item.body} description={item.description} icon_img={item.icon_img} sponsored={item.sponsored} category_title={this.props.category_title && this.props.category_title} layout='split'/>}
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
