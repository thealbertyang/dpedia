import React from 'react';
import { connect } from "react-redux"
import store from "../../../../../store"
import { getResults, setFilter } from '../../../../../actions/searchActions'
import { getCategories } from '../../../../../actions/categoriesActions'
import axios from 'axios'
import { Form, Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form'

import ReactGA from 'react-ga';
import crudActions from '../../../../../actions/crudActions'

let reviewsCategoriesCrudActions = new crudActions('REVIEWS_CATEGORIES','reviews_categories');

@connect((store) => {
	return {
		reviews_categories: store.reviews_categories,
	}
})
export class FilterSidebar extends React.Component {
	constructor(props){
		super(props)
		this.state = { 'select_all': { value: true, id: 'all' }};
	}

	componentWillMount(){
		this.props.dispatch(reviewsCategoriesCrudActions.getAll());
	}


	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		console.log('filtering');

		//if select all was clicked then make 
		if(target.name == 'select_all'){
			//make all unchecked
			Object.keys(this.state).map((item)=>{
				this.setState({
					[item]: {
						value: false,
					}
				});
			})	

			//make select all checked
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
		
			let result = false;
			let hits = 0;

			//if all other values are false then select all other wise do not
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

		//this.props.dispatch(setFilter(filters));
		console.log('SEARCh TERM', this.props.searchValue, 'test', filters);
		//this.props.dispatch(getResults(((this.props.searchTerm && typeof this.props.searchTerm !== 'undefined') ? this.props.searchTerm : 'all'),filters));
		this.props.filterFn(filters);

		this.setState({filtering : false})
		}
	}

	render(){
		return (
			<div className={`col-md-12 ${this.props.isActive === true && 'isActive'}`}>
				<h6 className="heading">Discover Resources</h6>
				<ul className="filter">
					<li>
						<label className="custom-control custom-checkbox">
							<input type='checkbox' name='select_all' checked={this.state.select_all.value} className="custom-control-input" onChange={(e)=>this.handleInputChange(e)} /> 
							<span className="custom-control-indicator"></span>
							<span className="custom-control-description">Select All</span>
						</label>
					</li>
					{this.props.reviews_categories.records && this.props.reviews_categories.records.map((item)=>{
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
