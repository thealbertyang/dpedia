import React from 'react';
import { connect } from "react-redux"
import store from "../store"
import { getResults, setFilter } from '../actions/searchActions'
import { getCategories } from '../actions/categoriesActions'
import axios from 'axios'
import { Form, Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form'

import ReactGA from 'react-ga';

@connect((store) => {
	return {
		search: store.search.results,
		searchTerm: store.search.searchTerm,
		filter: store.search.filter,
		resources: store.resources.resources,
		categories: store.categories.categories,
		auth: store.auth.authenticated,
		status: store.auth.status
	}
})
export class FilterSidebar extends React.Component {
	constructor(props){
		super(props)
		this.state = { 'select_all': { value: true, id: 'all' }};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount(){
		//this.props.match.params.search ? this.props.dispatch(getResults(this.props.match.params.search)) : this.props.dispatch(getResults('all'));
		this.props.dispatch(getCategories());

	}

	componentDidMount(){
	}

	componentWillUnmount(){
	}


	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		ReactGA.event({
			category: 'Search',
			action: 'Filter',
			label: event.target.getAttribute('data-title'),
			value: event.target.getAttribute('data-id')
		});

		console.log('filtering');

		if(target.name == 'select_all'){
			Object.keys(this.state).map((item)=>{
				this.setState({
					[item]: {
						value: false,
					}
				});
			})	
			//this.state.select_all == true ? this.setState({ select_all: false }) : this.setState({ select_all: true });

			this.setState({
				select_all: {
					value: true,
					id: 'all'
				}
			});

			
		}
		else {
			this.setState({
				[name]: {
					value: value,
					id: event.target.getAttribute('data-id')
				},
				select_all: {
					value: false,
					id: 'all'
				}
			});

		}
		
		this.setState({ filtering: true})
	}

	componentDidUpdate(prevProps, prevState){
		if(this.state.filtering == true){
		
			//if all other values are false then select all other wise do not
			let result = false;
			let hits = 0;

			for (let i in this.state) {
			    if (i !== 'select_all' && this.state[i].value === true) {
			        hits++;
			    }
			}

			if(hits > 0) {
				result = true;
			}

			this.setState({
				select_all: {
					value: result == true ? false : true,
					id: 'all'
				}
			});

		console.log('current state', this.state);
		let filters = [];
		if(this.state.select_all.value !== true){
		
			for(var key in this.state){
				console.log('item',this.state[key].id)
				if(this.state[key].value == true){
					filters.push(this.state[key].id);
					console.log('item id',this.state[key].id)
				}
			};
			console.log('test',filters);
		}
		else {
			console.log('all slected');
			filters.push('all');
		}

		this.props.dispatch(setFilter(filters));
		console.log('SEARCh TERM', this.props.searchTerm, 'test', filters);
		this.props.dispatch(getResults(((this.props.searchTerm && typeof this.props.searchTerm !== 'undefined') ? this.props.searchTerm : 'all'),filters));


		this.setState({filtering : false})
		}
	}

	render(){
		return (
			<div className={`col-md-12 ${this.props.isActive === true && 'isActive'}`}>
				<ul className="filter">
					<li>
						<label className="custom-control custom-checkbox">
							<input type='checkbox' name='select_all' checked={this.state.select_all.value} className="custom-control-input" onChange={(e)=>this.handleInputChange(e)} /> 
							<span className="custom-control-indicator"></span>
							<span className="custom-control-description">Select All</span>
						</label>
					</li>
					{this.props.categories && this.props.categories.map((item)=>{
						return (
							<li key={item.id}>
								<label className="custom-control custom-checkbox">
									<input type='checkbox' data-id={item.id} data-title={item.title} name={item.slug} checked={this.state && this.state[item.slug] && this.state[item.slug].value} className="custom-control-input" onChange={(e)=>this.handleInputChange(e)}/> 
									<span className="custom-control-indicator"></span> 
									<span className="custom-control-description">{item.title}</span>
								</label>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}
const selector = formValueSelector('search')

FilterSidebar = connect(store => { 
	let searchTerm = selector(store, 'search');

	return {
		searchTerm
	}
})(reduxForm({form: 'search', enableReinitialize: true})(FilterSidebar));
export default FilterSidebar;