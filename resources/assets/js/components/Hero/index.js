import React from 'react';
import { connect } from "react-redux"



export class Hero extends React.Component {
	constructor(props){
		super(props)
		this.state = { loaded: false, resources: null, key: 0 }
	}

	componentWillReceiveProps(nextProps){
		if(!this.state.loaded){
			if(nextProps.hero && nextProps.type.value == 'playlist'){
				console.log('PLAY LIST RESOURCES', nextProps.hero.resources);
				this.setState({loaded: true, resources: nextProps.hero.resources,});
				this.nextSlide();
			}
		}
	}

	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
		this.clearTimer();
	}

	componentWillUpdate(nextProps, nextState){
		console.log('WILL UPDATE!!!!!!!');
		this.nextSlide();
	}

	nextSlide = () => {
		if (this.timerHandle) {
	      // Exception?
	      return;
	    }
	    // Remember the timer handle
	    this.timerHandle = setTimeout(() => {
	      	console.log('NEXT SLIDE@@@@@@', this.state)
			let key = (this.state.key + 1);
			let resourcesLength = this.props.hero.resources.length;
			if(this.state.key + 1 >= resourcesLength){
				key = 0;
			}

			this.setState({ key:  key });
	      	this.timerHandle = 0;
	    }, 1000);

	}

	clearTimer = () => {
	    // Is our timer running?
	    if (this.timerHandle) {
	        // Yes, clear it
	        clearTimeout(this.timerHandle);
	        this.timerHandle = 0;
	    }
	  };

	setSlide = (key) => {
		this.setState({ key:  key });
	}

	render(){
		if(this.props.hero && this.state.resources){
			if(this.props.type.value !== 'playlist'){
				let typeLabel, slug, backgroundUrl;

				if(this.props.type.value == 'article'){
					typeLabel = 'Read Full Article';
					slug = 'articles';
					backgroundUrl = this.props.hero.header_img;
				}
				else if(this.props.type.value == 'video'){
					typeLabel = 'Watch Full Video';
					slug = 'videos';
					backgroundUrl = this.props.hero.video.thumbnail_large;
				}

				return (
					<div className="hero hero-playlist section" style={{ background: 'url('+backgroundUrl+')', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
						<div className="container">
							<div className="row">
								<div className="col-5">
									<div className="description-panel card">
										<div className="card-body">
											<div className="tags col-12 text-right">
												<span className="tag-item">{this.props.type.label}</span>
											</div>
											<h6 className="card-title">
												<b className="highlight"> Read:</b> <b>{this.props.hero.title}</b>
											</h6>
											<h4 className="description">"{this.props.hero.description}"</h4>
											<a href={'/'+slug+'/'+this.props.hero.slug} className="btn btn-round btn-primary float-right">{typeLabel}</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}
			else if(this.props.type.value == 'playlist'){
				let typeLabel, slug, backgroundUrl;

				if(this.props.hero.type == 'articles'){
					typeLabel = 'Read Full Article';
					slug = 'articles';
					backgroundUrl = this.state.resources && this.state.resources[this.state.key].header_img;
				
					return (
						<div className="hero hero-playlist section" style={{ background: 'url('+backgroundUrl+')', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
							<div className="container">
								<div className="row">
									<div className="col-5 d-flex align-items-end">
										<div className="description-panel card">
											<div className="card-body">
												<div className="tags col-12 text-right">
													<span className="tag-item">{(this.props.hero.type == 'videos' ? 'Video' : 'Article')}</span>
												</div>
												<h6 className="card-title">
													<b className="highlight"> Watch:</b> <b>{this.state.resources[this.state.key].title}</b>
												</h6>
												<h4 className="description">"{this.state.resources[this.state.key].description}"</h4>
												<a href={'/'+slug+'/'+this.state.resources[this.state.key].slug} className="btn btn-round btn-primary float-right">{typeLabel}</a>
											</div>
										</div>
									</div>
									{this.props.type.value == 'playlist' && 
										<div className='playlist-panel col-5 offset-2'>
											<div className="panel-top">
												<div className="tags col-12 text-right">
													<span className="tag-item">{(this.props.hero.type == 'videos' ? 'Video' : 'Article')} Playlist</span>
												</div>
												<h6 className="heading">{this.props.hero.title}</h6>
												<div className="expert-info row pb-2">
													<div className="col-12">
														<div className="d-flex flex-row align-items-center">
															<div className="d-flex flex-row align-items-center">
																<div className="avatar" style={{ background: 'url('+this.props.hero.expert.avatar_img+')', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
																</div>
																<span className="highlight">{this.props.hero.expert.first_name+' '+this.props.hero.expert.last_name}, {this.props.hero.expert.credentials}, {this.props.hero.expert.city}, {this.props.hero.expert.state} 
																<br/><a href={'/experts/'+this.props.hero.expert.user.username}>See Profile</a>
																</span>
															</div>
														</div>
													</div>
												</div>
												{this.props.hero.tags && <div className="tags">
													{this.props.hero.tags.map((item, key)=><span className="tag-item">{item.title}</span>)}
												</div>}
											</div>
											{this.state.resources && this.state.resources.map((resource, index)=>{ 
												return (
													<div className={`panel-item ${this.state.key == index && 'panel-item-active'}`} key={index} onClick={()=>this.setSlide(index)}>
														<a href="#" className="row">
															<div className="col-6">
																{this.state.key == index && <h6 className="now-playing">Previewing</h6>}
															</div>
															<div className="col-6">
																<div className="tags col-12 text-right">
																	<span className="tag-text">
																		<b className="highlight"></b>
																	</span>
																	<span className="tag-item">{(this.props.hero.type == 'videos' ? 'Video' : 'Article')}</span>
																</div>
															</div>
															<div className="col-3">
																<div className="header_img" style={{ background: 'url('+resource.header_img+')', backgroundSize: 'cover', backgroundPosition: 'center center', height: '6rem' }}>
																</div>
															</div>
															<div className="col-9">
																<h6 className="heading-small">{resource.title}</h6>
																<a href={`/articles/${resource.slug}`}><b>{(this.props.hero.type == 'videos' ? 'Watch Full Video' : 'Read Full Article')}</b></a>
																<div className="expert-info row no-gutters">
																	<div className="col-12">
																		<div className="d-flex flex-row align-items-center">
																			<div className="avatar" style={{ background: 'url('+resource.expert.avatar_img+')', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
																			</div>
																			<span className="highlight">{resource.expert.first_name+' '+resource.expert.last_name}, {resource.expert.credentials}, {resource.expert.city}, {resource.expert.state}</span>
																		</div>
																	</div>
																</div>
															</div>
														</a>
													</div>
												); 
											})}

										</div>
									}
								</div>
							</div>
						</div>
					)
				}
				else if(this.props.hero.type == 'videos'){
					typeLabel = 'Watch Full Video';
					slug = 'videos';
					backgroundUrl = this.state.resources && this.state.resources[this.state.key].video.thumbnail_large;

					return (
						<div className="hero hero-playlist section" style={{ background: 'url('+backgroundUrl+') center center / cover' }}>
							<div className="container-fluid">
								<div className="row">
									<div className="col-5 d-flex align-items-end">
										<div className="description-panel card">
											<div className="card-body">
												<div className="tags col-12 text-right">
													<span className="tag-item">{(this.props.hero.type == 'videos' ? 'Video' : 'Article')}</span>
												</div>
												<h6 className="card-title">
													<b className="highlight"> Watch:</b> <b>{this.state.resources[this.state.key].title}</b>
												</h6>
												<h4 className="description">"{this.state.resources[this.state.key].description}"</h4>
												<a href={'/'+slug+'/'+this.state.resources[this.state.key].slug} className="btn btn-round btn-primary float-right">{typeLabel}</a>
											</div>
										</div>
									</div>
									{this.props.type.value == 'playlist' && 
										<div className='playlist-panel col-5 offset-2'>
											<div className="panel-top">
												<div className="tags col-12 text-right">
													<span className="tag-item">{(this.props.hero.type == 'videos' ? 'Video' : 'Article')} Playlist</span>
												</div>
												<h6 className="heading">{this.props.hero.title}</h6>
												<div className="expert-info row pb-2">
													<div className="col-12">
														<div className="d-flex flex-row align-items-center">
															<div className="d-flex flex-row align-items-center">
																<div className="avatar" style={{ background: 'url('+this.props.hero.expert.avatar_img+')', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
																</div>
																<span className="highlight">{this.props.hero.expert.first_name+' '+this.props.hero.expert.last_name}, {this.props.hero.expert.credentials}, {this.props.hero.expert.city}, {this.props.hero.expert.state} 
																<br/><a href={'/experts/'+this.props.hero.expert.user.username}>See Profile</a>
																</span>
															</div>
														</div>
													</div>
												</div>
												{this.props.hero.tags && <div className="tags">
													{this.props.hero.tags.map((item, key)=><span className="tag-item">{item.title}</span>)}
												</div>}
											</div>
											{this.state.resources && this.state.resources.map((resource, index)=>{ 
												let duration = (resource.video.duration / 60).toFixed(2);
												return (
													<div className={`panel-item ${this.state.key == index && 'panel-item-active'}`} key={index} onClick={()=>this.setSlide(index)}>
														<a href="#" className="row">
															<div className="col-6">
																{this.state.key == index && <h6 className="now-playing">Now Playing</h6>}
															</div>
															<div className="col-6">
																<div className="tags col-12 text-right">
																	<span className="tag-text">
																		<b className="highlight">{duration}</b>
																	</span>
																	<span className="tag-item">{(this.props.hero.type == 'videos' ? 'Video' : 'Article')}</span>
																</div>
															</div>
															<div className="col-3">
																<div className="header_img" style={{ background: 'url('+resource.video.thumbnail_large+')', backgroundSize: 'cover', backgroundPosition: 'center center', height: '6rem' }}>
																</div>
															</div>
															<div className="col-9">
																<h6 className="heading-small">{resource.title}</h6>
																<a href={`/videos/${resource.slug}`}><b>{(this.props.hero.type == 'videos' ? 'Watch Full Video' : 'Read Full Article')}</b></a>
																<div className="expert-info row no-gutters">
																	<div className="col-12">
																		<div className="d-flex flex-row align-items-center">
																			<div className="avatar" style={{ background: 'url('+resource.expert.avatar_img+')', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
																			</div>
																			<span className="highlight">{resource.expert.first_name+' '+resource.expert.last_name}, {resource.expert.credentials}, {resource.expert.city}, {resource.expert.state}</span>
																		</div>
																	</div>
																</div>
															</div>
														</a>
													</div>
												); 
											})}

										</div>
									}
								</div>
							</div>
						</div>
					)
				}
			}
		}
		else {
			return null;
		}
	}
}
