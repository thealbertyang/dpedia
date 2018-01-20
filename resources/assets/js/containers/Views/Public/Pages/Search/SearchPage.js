import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import Footer from '../../../../../components/Footer'
import { Redirect, Link, withRouter } from 'react-router-dom'
import { ResourcesSearchList } from '../../Layouts/ResourcesSearchList'

import SlideNavbarWrapper from '../../Layouts/SlideNavbarWrapper'

import crudActions from '../../../../../actions/crudActions'

import Select, {Creatable} from 'react-select';


let resourcesCrudActions = new crudActions('RESOURCES','resources');

@connect((store) => {
	return {
		resources: store.resources,
	}
})
export class SearchPage extends React.Component {
	constructor(props){
		super(props);
		this.state = { scrollTop: 0, filter: {'value': 'relevance', 'label': 'Relevance'}, type: null};
	}

	componentWillMount(){
		console.log('trying to search');
		this.props.match.params.search && this.props.dispatch(resourcesCrudActions.search(this.props.match.params.search));
	}

	changeSortBy = (value) => {
		console.log('CHANGED VALUE', value)

		//if its type or experts then don't change
		if(value !== 'type'){
			console.log('NOT TYPE OR EXPERT')
			this.props.dispatch(resourcesCrudActions.search(this.props.match.params.search, value));

		}
		this.setState({ 
			filter: value,
		});
	}

	changeTypeBy = (value) => {
		console.log('CHANGED Type VALUE', value)
		this.props.dispatch(resourcesCrudActions.search(this.props.match.params.search, 'type/'+value));
		this.setState({ 
			type: value,
		});
	}

	render(){
		console.log('PROPS', this.props, this.state)
		return (
			<div className="page search">
				<SlideNavbarWrapper>
				<div className="body">
					<div className="section">
						<div className="container-fluid">
							<div className="row text-center">
								<div className="col">
									<h1 className="heading pb-3">
										<span className="fw-400"><i className="fas fa-search"></i> {this.props.resources && this.props.resources.records && this.props.resources.records.length} Search Results for </span>
										<span className="highlight">"{this.props.match.params.search}"</span>
									</h1>
									<div className="row pb-3">
										<div className={`col-md-2 ${(this.state.filter.value == 'type' || this.state.filter == 'type') ? 'offset-md-4' : 'offset-md-5'} col-12`}>
											<Select
												value={this.state.filter}
												clearable={false}
												options = {[
													{'value': 'relevance', 'label': 'Relevance'},
													{'value': 'newest', 'label': 'Newest'},
													{'value': 'oldest', 'label': 'Oldest'},
													{'value': 'type', 'label': 'Type'},
													{'value': 'expert', 'label': 'Expert'},
												]}
												placeholder = 'Sort By'
												onChange = {(e)=>{ //console.log('event check change', e); 
												this.changeSortBy(e.value)}}
											/>											
										</div>
										{(this.state.filter.value == 'type' || this.state.filter == 'type') && <div className="col-md-2 col-12">
													<Select
														value={this.state.type}
														clearable={false}
														options = {[
															{'value': 'videos', 'label': 'Videos'},
															{'value': 'articles', 'label': 'Articles'},
															{'value': 'reviews', 'label': 'Reviews'},
														]}
														placeholder = 'Sort By'
														onChange = {(e)=>{ //console.log('event check change', e); 
														this.changeTypeBy(e.value)}}
													/>
										</div>}
									</div>	
									<hr/>
								</div>
							</div>
						</div>
					</div>
					<ResourcesSearchList title="Recent Articles" type="articles" records={this.props.resources && this.props.resources.records && 
						this.props.resources.records.filter((item)=>{
							if(item.status == 'published'){
								return item;
							}
						})} />
				</div>
				<Footer/>
				</SlideNavbarWrapper>
			</div>
		);
	}
}

export default withRouter(SearchPage);
