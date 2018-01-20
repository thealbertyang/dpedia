import React from 'react'

import ReactGA from 'react-ga';

export default class Card extends React.Component {
	render(){
		return (
			<div className={this.props.icon == true ? 'card has-icon' : 'card'} {...this.props.style}>
				<div className="card-section">
					<div className="card__header row">
						<div className="icon col-md-4">
							{this.props.icon == true && <img src={this.props.icon_img ? this.props.icon_img : '/img/app_icon.jpg'} className="icon__img" />}
						</div>
						<div className="tags col-md-8">
							<span className="tag__item">{this.props.category}</span>{this.props.sponsored == true && <span className="tag__item sponsored">Sponsored</span>}
						</div>
					</div>
					<div className="card__body row">
						<div className="col-md-12">
							<h5 className="heading"><a href={this.props.link}>{this.props.title}</a></h5>
							<p className="description" dangerouslySetInnerHTML={{ __html: this.props.description}}></p>
							{this.props.layout == 'button' && <p className="review"><a href={this.props.link}>Full Review</a></p>}
							
							<div className="tags">
							{typeof this.props.tags !== 'undefined' && typeof this.props.tags.map !== 'undefined' && this.props.tags && this.props.tags.map((tag)=>{
								return (
									<span className="tag__item">{tag.title}</span>
								);
							})}
							</div>

							
						</div>
					</div>
					<div className="card__footer row">
						{this.props.layout == 'links' &&
						<div className={`link ${this.props.split ? 'col-md-6 col-6' : 'col-md-12'}`}><a href={this.props.url} target="_blank">See this website <i className="fa fa-external-link" aria-hidden="true"></i></a></div>}
						{this.props.layout == 'links' &&
						<div className={`review ${this.props.split ? 'col-md-6 col-6' : 'col-md-12'}`}><a href={this.props.link}>Full Review</a></div>}

						{this.props.layout == 'button' && 
						<div className="link col-md-12"><a href={this.props.url} className="btn btn-primary full-width" target="_blank">See this website <i className="fa fa-external-link" aria-hidden="true"></i></a></div>}
					</div>
				</div>
		    </div>
		);
	}
}