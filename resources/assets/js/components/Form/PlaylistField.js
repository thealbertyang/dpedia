import React from 'react';
import { connect } from "react-redux"

import Select, {Creatable} from 'react-select';
import crudActions from '../../actions/crudActions'
let videosCrudActions = new crudActions('VIDEOS','videos');
let articlesCrudActions = new crudActions('ARTICLES','articles');

@connect((store) => {
	return {
		videos: store.videos,
		articles: store.articles,
	}
})
export default class PlaylistField extends React.Component {
	constructor(props){
		super(props);
		this.state = { playlist: [], resources: [], loaded: false, type: null };
	}

	componentWillMount(){
		this.props.dispatch(videosCrudActions.getAll('all'));
		this.props.dispatch(articlesCrudActions.getAll('all'));
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		const id = Number(event.target.getAttribute('data-id'));

		console.log('HANDLING INPUT CHANGE ALREADY');

		//Throw into right key
		Object.keys(this.state.resources).map((key, index)=>{
			let resource = this.state.resources[key];
			if(resource.id == id){
				this.setState({
					resources: {
						...this.state.resources,		
						[index]: {
							value: value,
							label: event.target.getAttribute('data-label'),
							id: Number(event.target.getAttribute('data-id')),
						}
					}
				});
			}
		})
	}

	addToPlaylist = () => {
		let playlistData = this.state.playlist;
		let resourcesListData = Object.keys(this.state.resources).reduce((results, key, index)=> {
			let resource = this.state.resources[key];
			if(resource.value == false){
				results.push(resource);
			}
			else {
				playlistData.push({...resource, value: false});
			}
			return results;
		}, []);

		this.setState({ playlist: playlistData, resources: resourcesListData });

		this.props.onChange({data: playlistData, type: this.state.type});
	}

	removeFromPlaylist = (id) => {

		let resourcesData = this.state.resources;
		let playlistData = Object.keys(this.state.playlist).reduce((results, key)=>{
			let playlist = this.state.playlist[key];
			if(id !== key){
				results.push(playlist);
			}
			else {
				resourcesData.push(playlist);
			}
			return results;
		}, []);

		this.setState({ playlist: playlistData, resources: resourcesData});

		this.props.onChange({data: playlistData, type: this.state.type});

	}

	normalizeData = (options) => {
		/*
			data = {
				{ title: 1, id: 1 }
			}

			options = {
				{value: 1, label: "Mr. Stephen Okuneva II"},
				{value: 2, label: "Ephraim O'Reilly"},
				{value: 3, label: "George Nitzsche"},
			}

			->

			options = {
				{value: true, label: "Mr. Stephen Okuneva II", id: 1},
				{value: true, label: "Ephraim O'Reilly", id: 2},
				{value: false, label: "George Nitzsche"}, id: 3,
			}
		*/
		return Object.keys(options).map((key)=>{
			console.log('OPTIONS', options[key])

			if(options[key] && options[key].label){
				return { value: false, label: options[key].label, id: options[key].value };
			}
			else if(options[key] && options[key].title){
				return { value: false, label: options[key].title, id: options[key].resource_id };
			}
		});
	}

	

	inputChecked = (option) => {
		//look through the array and find the id that matches then check if value selected
		let isInputChecked = false;

		Object.keys(this.state.resources).forEach((element, index, array)=>{ 
			let resource = this.state.resources[index];
			if(resource.id == option.id){
				isInputChecked = resource.value;
				//console.log('resource', resource, element, index, array);
			}
		})

		return isInputChecked;
	}

	componentWillUpdate(nextProps, nextState){
		//console.log('WHAT IS THIS', nextProps, nextState, this.state)
		if(this.state.type !== null && nextState.type !== null){
			//console.log('BOTH ARE LOADED');
			if(this.state.type !== nextState.type){
				//Swapped
				//console.log('THIS WAS SWAPPED', nextState.type);
				this.setState({ 
					type: nextState.type,
					playlist: [],
					resources: nextState.type == 'articles' ? this.normalizeData(nextProps.articles.records) : this.normalizeData(nextProps.videos.records) 
				});
			}
		}
		else if(this.state.type == null && nextState.type !== null){
			//console.log('ONE LOADED', nextState)
		}
	}

	getBalancedList = (type, playlistData, resourcesData) => {
		//console.log('type: ', type, 'playlistData', playlistData, 'resourcesData', resourcesData);
		let results = [];

		if(playlistData.length > 0){
			for(let i=0;i<resourcesData.length;i++){
					
				let resource = resourcesData[i];
				let match = 0;

				for(let x=0;x<playlistData.length;x++){
					let playlist = playlistData[x];
					console.log('AYE I', i, 'playlistData[i]', playlist, 'resourcesData[i]', resource);


					if(type == 'resources'){
						let doesntMatch = (playlist.id !== resource.id);
						

						if(doesntMatch){
							
							match++;

							let doesntMatchAll = (match == playlistData.length);
							console.log('doesntMatch', doesntMatch, playlist.id, resource.id, 'match', match, 'resourcesData.length', resourcesData.length)
							if(doesntMatchAll){

								console.log('if it ever gets here');

								//Add to list to return
								results.push(resourcesData[i]);
							}
						}
					}

					if(type == 'playlist'){
							let matches = (playlist.id == resource.id);
							let matchesAll = (match == playlistData.length);
						
							if(matches){
								match++;

								if(matchesAll){
									//Add to list to return
									results.push(playlistData[i]);
								}
							}
					}
				}
			}
		}

		else {
			console.log('playlist is empty!!!!!')
			results = resourcesData;
		}

			return results;

	}

	componentWillReceiveProps(nextProps){
		//If we haven't loaded yet
		if(!this.state.loaded && nextProps.value !== null && nextProps.type !== null && nextProps.typeOptions !== null && nextProps.articles.records !== null && nextProps.videos.records !== null){
			//console.log('thisprops', this.props, 'nextProps', nextProps, 'thisstate', this.state)
			//Playlist & Resource
			//Check if we have current playlist
			//console.log('do we have current playlist', this.props, nextProps, this.state)

			let playlistData = (nextProps.value.length > 0) ? this.normalizeData(nextProps.value) : [];
			//let resourcesListData = (nextProps.typeOptions == 'articles') ? this.normalizeOptions(nextProps.articles.records) : this.normalizeOptions(nextProps.videos.records);

			//console.log('BIG TEST', nextProps.type == 'articles' ? this.getBalancedList('resources', playlistData, this.normalizeData(nextProps.articles.records)) : this.getBalancedList('resources', playlistData, this.normalizeData(nextProps.videos.records)));
			this.setState({ 
				loaded: true, 
				type: nextProps.type,
				playlist: playlistData,
				resources: nextProps.type == 'articles' ? this.getBalancedList('resources', playlistData, this.normalizeData(nextProps.articles.records)) : this.getBalancedList('resources', playlistData, this.normalizeData(nextProps.videos.records))
			});

			this.props.onChange({data: playlistData, type: nextProps.type});
		}
	}


	changeType = (value) => {
		this.setState({ 
			type: value,
			resources: value == 'articles' ? this.normalizeData(this.props.articles.records) : this.normalizeData(this.props.videos.records),
			playlist: [],
		});

		this.props.onChange({data: [], type: value});
		
	}

	render(){
		const { onChange, options, typeOptions } = this.props;
		//console.log('111this state', this.state, 'this props', this.props, 'TYPE', this.props.type);
		//console.log('type options', typeOptions);
		//console.log('THIS PROPS', this.props, this.state);

		return (
			<div className="col-12">
				<label>Playlist</label>
				<div className="multiselect-inner">
					<div className="form-group row">
						<div className="col-12">
							<label>Type</label>
							<Select
								value={this.state.type}
								clearable={false}
								options={typeOptions}
								placeholder='Type'
								onBlur={(e)=>{console.log('event check', e, e.target.value); }}
								onChange={(e)=>{ console.log('event check change', e); this.changeType(e.value)}}
							/>
						</div>
					</div>
					<div className="form-group row">
						<div className="col-6">
							<div className="row no-gutters">
								<div className="col-12">
									<label>{this.state.type == 'articles' ? 'Articles' : 'Videos'}</label>
								</div>
							</div>
						</div>							
						<div className="col-6">
							<div className="row no-gutters">
								<div className="col-12">
									<label>In this playlist</label>
								</div>
							</div>
						</div>
						<div className="multiselect-input col-12">
							<div className="row">
								<div className="col-6">
									<div className="row no-gutters">
										<div className="col-12">
											{this.state.resources && Object.keys(this.state.resources).map((key, index)=>{

												//console.log('THIS STATE RESOURCES', this.state.resources)
												let option = this.state.resources[key];

												//console.log('THIS OPTION', option)

												if(option){
													return (
														<div key={index} className='form-group'>
															<label className="form-check-label">
										            			<input type="checkbox" className="form-check-input" name={option.id} data-id={option.id} data-label={option.label} 
										            				checked={this.inputChecked(option)} 
										            				onChange={this.handleInputChange} />
																{option.label}
										            		</label>
										            	</div>
													)
												}
											})}
										</div>
										<div className="col-12">
											<input type="button" className="btn btn-primary" value={`Add ${this.state.type == 'articles' ? 'Article' : 'Video'}(s)`} onClick={()=>this.addToPlaylist()} />
										</div>
									</div>
								</div>
								<div className="col-6">
									{this.state.playlist && Object.keys(this.state.playlist).map((item, index)=>{
										return (
											<div key={index}>
												<label>{this.state.playlist[item].label} <a href="#" onClick={(e)=>{ e.preventDefault(); this.removeFromPlaylist(item)}}><i className="fa fa-trash"></i></a></label>
											</div>
										)
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
