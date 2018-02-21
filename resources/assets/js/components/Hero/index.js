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
				//console.log('PLAY LIST RESOURCES', nextProps.hero.resources);
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
		//console.log('WILL UPDATE!!!!!!!');
		
	}

	nextSlide = () => {
		if (this.timerHandle) {
	      // Exception?
	      return;
	    }
	    // Remember the timer handle
	    this.timerHandle = setTimeout(() => {
	      	//console.log('NEXT SLIDE@@@@@@', this.state)
			let key = (this.state.key + 1);
			let resourcesLength = this.props.hero.resources.length;
			if(this.state.key + 1 >= resourcesLength){
				key = 0;
			}

			this.setState({ key:  key });
	      	this.timerHandle = 0;
	      	this.nextSlide();
	    }, 5000);

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
		this.clearTimer();
		this.nextSlide();
	}

	render(){


		if(this.props.hero){

			if(this.props.type.value !== 'playlist'){
				let type, typeLabel, slug, backgroundUrl;
				if(this.props.type.value == 'article'){
					type = "Article";
					typeLabel = 'Read Full Article';
					slug = 'articles';
					backgroundUrl = this.props.hero.header_img;
				}
				else if(this.props.type.value == 'video'){
					type = "Video";
					typeLabel = 'Watch Full Video';
					slug = 'videos';
					backgroundUrl = this.props.hero.header_img ? this.props.hero.header_img : this.props.hero.video.thumbnail_large;
				}

				return (
					<div className="hero hero-playlist hero-playlist-single section" style={{ background: 'url('+backgroundUrl+')', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
						<div className="container-fluid">
							<div className="row">
								<div className="col-md-7 col-12 d-flex align-items-end screen-panel" style={{ height: '35rem' }}>
									<div className="description-card card">
										<div className="card-body">
											<div className="row full-width">
													<div className="col-6 text-left">
														<h6 className="card-title"><b className="highlight"> Watch:</b></h6>
													</div>
													<div className="tags col-6 float-right text-right">
														<span className="tag-item">{type}</span>
													</div>
												</div>
											<h6 className="card-title">
												<b>{this.props.hero.title}</b>
											</h6>
											<div className="row">
												<div className="col-12">
													<h4 className="description">"{this.props.hero.description}"</h4>
													
												</div>												
												<div className="col-12">
													<a href={'/'+slug+'/'+this.props.hero.slug} className="btn btn-round btn-grey float-right">{typeLabel}</a>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			}
			else if(this.props.type.value == 'playlist' && this.state.resources && this.state.resources[this.state.key]){
				let typeLabel, slug, backgroundUrl;

				if(this.props.hero.type == 'articles'){
					typeLabel = 'Read Full Article';
					slug = 'articles';
					backgroundUrl = this.state.resources && this.state.resources[this.state.key].header_img;
				
					return (
						<div className="hero hero-playlist section" style={{ background: 'url('+backgroundUrl+')', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
							<div className="container">
								<div className="row">
									<div className="col-md-7 col-12 d-flex align-items-end screen-panel">
										<div className="description-card card">
											<div className="card-body">
												<div className="col-6 text-left">
													<b className="highlight"> Watch:</b>
												</div>
												<div className="tags col-6 text-right">
													<span className="tag-item">{(this.props.hero.type == 'videos' ? 'Video' : 'Article')}</span>
												</div>
												<h6 className="card-title">
													<b>{this.state.resources[this.state.key].title}</b>
												</h6>
												<h4 className="description">"{this.state.resources[this.state.key].description}"</h4>
												<a href={'/'+slug+'/'+this.state.resources[this.state.key].slug} className="btn btn-round btn-grey float-right">{typeLabel}</a>
											</div>
										</div>
									</div>
									{this.props.type.value == 'playlist' && 
										<div className='playlist-panel col-md-5 offset-md-2 col-12'>
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
											<div className="panel-items-container">
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
					backgroundUrl = this.state.resources && this.state.resources[this.state.key].header_img ? this.state.resources[this.state.key].header_img : this.state.resources[this.state.key].video.thumbnail_large;

					return (
						<div className="hero hero-playlist section">
							<div className="container-fluid">
								<div className="row">
									<div className="col-md-7 col-12 d-flex align-items-start screen-panel" style={{ background: 'url('+backgroundUrl+') center center / cover' }}>
										<div className="description-panel">
											<h6 className="title">
												<b>{this.state.resources[this.state.key].title}</b>
											</h6>
											<a href={'/'+slug+'/'+this.state.resources[this.state.key].slug} className="btn btn-square btn-primary"><i className="far fa-play-circle"></i> {typeLabel}</a>
										</div>
										{/*<div className="description-card card">
											<div className="card-body">
												<div className="row full-width">
													<div className="col-6 text-left">
														<h6 className="card-title"><b className="highlight"> Watch:</b></h6>
													</div>
													<div className="tags col-6 float-right text-right">
														<span className="tag-item">{(this.props.hero.type == 'videos' ? 'Video' : 'Article')}</span>
													</div>
												</div>
												<h6 className="card-title">
													<b>{this.state.resources[this.state.key].title}</b>
												</h6>
												<h4 className="description">"{this.state.resources[this.state.key].description}"</h4>
												<a href={'/'+slug+'/'+this.state.resources[this.state.key].slug} className="btn btn-round btn-grey float-right"><i className="far fa-play-circle"></i> {typeLabel}</a>
											</div>
										</div>*/}
									</div>
									{this.props.type.value == 'playlist' && 
										<div className='playlist-panel col-md-5 ml-auto col-12'>
											<div className="panel-top">
												<div className="row">
													<div className="col-9">
														<h6 className="heading">{this.props.hero.title}</h6>
													</div>
													<div className="tags col-3 float-right text-right">
														<span className="tag-item">{(this.props.hero.type == 'videos' ? 'Video' : 'Article')} Playlist</span>
													</div>
												</div>
												<div className="expert-info row">
													<div className="col-12">
														<div className="d-flex flex-row align-items-center">
															<div className="d-flex flex-row align-items-center">
																<div className="avatar" style={{ background: 'url('+this.props.hero.expert.avatar_img+')', backgroundSize: 'cover', backgroundPosition: 'center center' }}>
																</div>
																<a href={'/experts/'+this.props.hero.expert.user.username} className="see-profile"><span className="highlight">{this.props.hero.expert.first_name+' '+this.props.hero.expert.last_name}, {this.props.hero.expert.credentials}, {this.props.hero.expert.city}, {this.props.hero.expert.state} 
																</span></a>
															</div>
														</div>
													</div>
												</div>
												{this.props.hero.tags && <div className="tags">
													{this.props.hero.tags.map((item, key)=><span className="tag-item">{item.title}</span>)}
												</div>}
											</div>
											<div className="panel-items-container">
												{this.state.resources && this.state.resources.map((resource, index)=>{ 
													let duration = (resource.video.duration / 60).toFixed(2);
													return (
														<div className={`panel-item ${this.state.key == index && 'panel-item-active'}`} key={index} onClick={()=>this.setSlide(index)}>
															<a href="#" className="row">
																<div className="col-6 d-flex align-items-center">
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
																	<div className="header_img" style={{ background: 'url('+(resource.header_img ? '/'+resource.header_img : resource.video.thumbnail_large)+')', backgroundSize: 'cover', backgroundPosition: 'center center', height: '8rem' }}>
																	</div>
																</div>
																<div className="col-9">
																	<h6 className="heading-small">{resource.title}</h6>
																	<a href={`/videos/${resource.slug}`} className="see-profile"><b>{(this.props.hero.type == 'videos' ? 'Watch Full Video' : 'Read Full Article')}</b></a>
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
										</div>
									}
								</div>
							</div>
						</div>
					)
				}
			}
			else {
				return <div className="hero hero-loading section"></div>;
			}
		}
		else {
			return <div className="hero hero-loading section"></div>;
		}
	}
}
