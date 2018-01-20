import React from 'react';
import { connect } from "react-redux"

import Select, {Creatable} from 'react-select';
import crudActions from '../../actions/crudActions'
let videosCrudActions = new crudActions('VIDEOS','videos');
let articlesCrudActions = new crudActions('ARTICLES','articles');
let playlistsCrudActions = new crudActions('PLAYLISTS','playlists');

@connect((store) => {
	return {
		videos: store.videos,
		articles: store.articles,
		playlists: store.playlists,
	}
})
export default class HeroField extends React.Component {
	constructor(props){
		super(props);
		this.state = { resource: [], resources: [], loaded: false, type: null };
	}

	componentWillMount(){
		this.props.dispatch(videosCrudActions.getAll('all'));
		this.props.dispatch(articlesCrudActions.getAll('all'));
		this.props.dispatch(playlistsCrudActions.getAll('all'));
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

	normalizeData = (options, id) => {
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

			if(id && options[key] && options[key][id]){
				return { value: options[key][id], label: options[key].title };
			}
			else if(options[key] && options[key].label){
				return { value: options[key].value, label: options[key].label };
			}
			else if(options[key] && options[key].title){
				return { value: options[key].id, label: options[key].title };
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
		console.log('WHAT IS THIS', nextProps, nextState, this.state)
		if(this.state.type !== null && nextState.type !== null){
			console.log('BOTH ARE LOADED');
			if(this.state.type !== nextState.type){
				//Swapped
				console.log('THIS WAS SWAPPED', nextState.type);

				let resources = () => {
					if(nextState.type == 'article'){
						return this.normalizeData(nextProps.articles.records);
					}
					else if(nextState.type == 'video'){
						return this.normalizeData(nextProps.videos.records);
					}
					else if(nextState.type == 'playlist'){
						return this.normalizeData(nextProps.playlists.records, 'id');
					}
				}

				this.setState({ 
					type: nextState.type,
					resources: resources(),
				});
			}
		}
		else if(this.state.type == null && nextState.type !== null){
			console.log('ONE LOADED', nextState)
		}
	}

	getBalancedList = (type, playlistData, resourcesData) => {
		console.log('type: ', type, 'playlistData', playlistData, 'resourcesData', resourcesData);
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
			console.log('HERO thisprops', this.props, 'nextProps', nextProps, 'thisstate', this.state)
			//Playlist & Resource
			//Check if we have current playlist
			//console.log('do we have current playlist', this.props, nextProps, this.state)

			let playlistData = (nextProps.value.length > 0) ? this.normalizeData(nextProps.value) : [];
			//let resourcesListData = (nextProps.typeOptions == 'articles') ? this.normalizeOptions(nextProps.articles.records) : this.normalizeOptions(nextProps.videos.records);


			let resources = () => {
					if(nextProps.type == 'article'){
						return this.normalizeData(nextProps.articles.records);
					}
					else if(nextProps.type == 'video'){
						return this.normalizeData(nextProps.videos.records);
					}
					else if(nextProps.type == 'playlist'){
						return this.normalizeData(nextProps.playlists.records, 'id');
					}
				}

			let value = () => {
				if(nextProps.type == 'article'){
					return nextProps.value.id;
				}
				else if(nextProps.type == 'video'){
					return nextProps.value.id;

				}
				else if(nextProps.type == 'playlist'){
					return nextProps.value.id;
				}
			}

			console.log('BIG TEST', nextProps, 'type', nextProps.type, nextProps.type == 'articles' ? this.getBalancedList('resources', playlistData, this.normalizeData(nextProps.articles.records)) : this.getBalancedList('resources', playlistData, this.normalizeData(nextProps.videos.records)));
			this.setState({ 
				loaded: true, 
				type: nextProps.type,
				resources: resources(),
				value: value(),
			});

			this.props.onChange({value: nextProps.value.id, type: nextProps.type});
		}
	}


	changeType = (value) => {
		console.log('VALUE', value, 'ON TOP OF THAT PROPS', this.props, 'STATE', this.state)
		let resources = () => {
					if(value == 'article'){
						return this.normalizeData(this.props.articles.records);
					}
					else if(value == 'video'){
						return this.normalizeData(this.props.videos.records);
					}
					else if(value == 'playlist'){
						return this.normalizeData(this.props.playlists.records, 'id');
					}
				}
		this.setState({ 
			type: value,
			resources: resources(),
			value: null,
		});

		this.props.onChange({value: null, type: value});
		
	}	

	changeResourceType = (value) => {
		console.log('RESOURCE VALUE', value, 'ON TOP OF THAT PROPS', this.props, 'STATE', this.state)
		
		this.setState({ 
			value: value,
		});

		this.props.onChange({value: value, type: this.state.type});
		
	}

	render(){
		const { onChange, options, typeOptions } = this.props;
		//console.log('111this state', this.state, 'this props', this.props, 'TYPE', this.props.type);
		//console.log('type options', typeOptions);
		console.log('THIS PROPS', this.props, this.state);

		return (
			<div className="col-12">
				<label>Hero</label>
				<div className="multiselect-inner">
					<div className="form-group row">
						<div className="col-6">
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
						<div className="col-6">
							<label>Resource</label>
							<Select
								value={this.state.value}
								clearable={false}
								options={this.state.resources}
								placeholder='Type'
								onBlur={(e)=>{console.log('event check', e, e.target.value); }}
								onChange={(e)=>{ console.log('event check change resource', e); this.changeResourceType(e.value)}}
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
