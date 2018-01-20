import React from 'react'
import * as htmlToText from 'html-to-text'

export default class VideoCard extends React.Component {

	constructor(props){
		super(props)
	}

	htmlToText = (html) => {
		return htmlToText.fromString(this.props.body); 
	}

	truncate = (text, limit) => {
		return text.substring(0, limit)+'...';
	}

	render(){
		let bodyText = this.htmlToText(this.props.body).substring(0,150)+'...';
		let wordCount = this.props.body && this.props.body.split(' ').length;
		let minutesToRead = Math.round(wordCount / 275);

		if(minutesToRead < 1){
			minutesToRead = 1;
		}
		console.log(this.props);

		return (
			<div className="card">
				<div className="card-img-top" style={{background: 'url('+this.props.video.thumbnail_large+') center center / cover' }} />
				<div className="card-body">
					<div className="tags col-12 text-right">
						<span className="tag-text"><b className="highlight">{(this.props.video_time / 60).toFixed(2)}</b></span>
						<span className="tag-item">Videos</span>
					</div>

					<h6 className="card-title"><b className="highlight">Watch:</b></h6>
					<h6 className="card-title"><b>{this.props.title}</b></h6>
					<p className="card-text">{this.props.description.substring(0,150)+'...'}</p>
					<a href={`/videos/${this.props.slug}`} className="btn btn-primary btn-round full-width"><i className="fa fa-play-circle-o" aria-hidden="true"></i> Watch Video</a>
				</div>
			</div>
		);
	}
}