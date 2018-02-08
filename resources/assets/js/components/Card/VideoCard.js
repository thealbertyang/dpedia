import React from 'react'
import * as htmlToText from 'html-to-text'

export default class VideoCard extends React.Component {

	constructor(props){
		super(props)
	}

	htmlToText = (html) => {
		return htmlToText.fromString(html); 
	}

	truncate = (text, limit) => {
		return text.substring(0, limit)+'...';
	}

	render(){

		let bodyText, wordCount, watchTime, backgroundImage, title;

		if(this.props.resourceable && this.props.resourceable.body){
			bodyText = this.htmlToText(this.props.resourceable.body).substring(0,150)+'...';
			watchTime = (this.props.resourceable.video_time / 60).toFixed(2);
		}
		else if(this.props.body){
			bodyText = this.htmlToText(this.props.body).substring(0,150)+'...';
			watchTime = (this.props.video_time / 60).toFixed(2);
		}

		backgroundImage = this.props.header_img ? '/'+this.props.header_img : this.props.video.thumbnail_large;
		//title = this.htmlToText(this.props.title).substring(0,75)+'...';
		title = this.htmlToText(this.props.title).substring(0,75);
		console.log(this.props);

		return (
			<div className="card">
				<div className="card-img-top" style={{background: 'url('+backgroundImage+') center center / cover' }} />
				<div className="card-body">
					<div className="tags float-right text-right full-width">
						<span className="tag-text"><b className="highlight">{watchTime}</b></span>
						<span className="tag-item">Videos</span>
					</div>

					<h5><b className="highlight">Watch:</b></h5>
					<h5 className="card-title mb-4"><a href={`/videos/${this.props.slug}`}><b>{title}</b></a></h5>
					{/*<p className="card-text">{this.props.description.substring(0,150)+'...'}</p>*/}
					<a href={`/videos/${this.props.slug}`} className="btn btn-primary btn-square"><i className="fa fa-play-circle-o" aria-hidden="true"></i> Watch Video</a>
				</div>
			</div>
		);
	}
}