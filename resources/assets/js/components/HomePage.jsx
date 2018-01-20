import React from 'react';
import { connect } from "react-redux"
import store from "../../store"
import Navbar from "../Navbar"
import SlideNav from "../SlideNav"
import Footer from '../Footer'
import Card from '../Card'
import SlideNavbarWrapper from '../layout/SlideNavbarWrapper'
import Select, { AsyncCreatable } from 'react-select';
import { Form, Field, reduxForm, SubmissionError, formValueSelector } from 'redux-form'
import { getResources, submitForm, update, clearStatus } from '../../actions/resourcesActions'
import { getResults } from '../../actions/searchActions'
import { HomeSearchResults } from '../HomeSearchResults'
import axios from 'axios'
import Cookies from 'universal-cookie'




const renderSearchField = ({ input, label, meta: { touched, error, onChange, onBlur }, errors, children, options }) => {

return (<div className={errors ? 'has-danger' : ''}>
	<AsyncCreatable
		{...input}
	  //options={options}
	  placeholder={label}
	  onBlur={(e)=>{input.onBlur(input.value); console.log(e, input.value);}}
	  onChange={(e)=>{console.log(e); input.onChange(e);}}
	  onSubmit={(e)=>{console.log('test')}}
	  loadOptions={()=>{	
	  	const cookies = new Cookies();
		return axios.get('/api/resources?token='+cookies.get('token')+'&page=all')
		.then((response)=>{
			response = { options: response.data.map((item, key)=>{
				return {
					value: item.id,
					label: item.title
				}
			}) } ;

			return response;
			
		})
		.catch((err) => { 
		})
	}}
	/>
</div>)

}


@connect((store) => {
	return {
		search: store.search.results,
		resources: store.resources.resources,
		auth: store.auth.authenticated,
		status: store.auth.status
	}
})
export class HomePage extends React.Component {
	constructor(props){
		super(props)
		this.state = { isActiveNav: false, scrollTop: 0 };
		this.navbarToggle = this.navbarToggle.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}

	componentWillMount(){
		this.props.match.params.search ? this.props.dispatch(getResults(this.props.match.params.search)) : this.props.dispatch(getResults('all'));
	}

	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll(event){
		let scrollTop = event.srcElement.documentElement.scrollTop || window.pageYoffset || event.srcElement.body.scrollTop;
        this.setState({ scrollTop: scrollTop });
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	login(e){
		this.props.dispatch(login(this.state.email, this.state.password, this.props.loggedInPath));
		e.preventDefault();
	}

	navbarToggle(){
		this.setState({ isActiveNav: this.state.isActiveNav == true ? false : true });
	}

	render(){
		console.log(this.props);

		return (
			<div className="page home">
				<div className={`side col-md-2 ${this.state.scrollTop >= 100 ? 'isActive' : ''}`}>
					<div className="mobile-btn">
						Filter Results
					</div>
					<div className="row">
						<div className="col-md-12">
							<h4 className="heading-small-title">Resource Type</h4>
							<ul className="filter">
								<li className="isActive">
									<label className="custom-control custom-checkbox">
										<input type='checkbox' name='filter' className="custom-control-input"/> 
										<span className="custom-control-indicator"></span>
										<span className="custom-control-description">Select All</span>
									</label>
								</li>
								<li>
									<label className="custom-control custom-checkbox">
										<input type='checkbox' name='filter' className="custom-control-input"/> 
										<span className="custom-control-indicator"></span> 
										<span className="custom-control-description">Digital Apps</span>
									</label>
								</li>
								<li>
									<label className="custom-control custom-checkbox">
										<input type='checkbox' name='filter' className="custom-control-input"/> 
										<span className="custom-control-indicator"></span>
										<span>Clinical Trials</span>
									</label>
								</li>
								<li>
									<label className="custom-control custom-checkbox">
										<input type='checkbox' name='filter' className="custom-control-input"/> 
										<span className="custom-control-indicator"></span>
										<span className="custom-control-description">Drugs</span>
									</label>
								</li>
								<li>
									<label className="custom-control custom-checkbox">
										<input type='checkbox' name='filter' className="custom-control-input"/>
										<span className="custom-control-indicator"></span>
										<span className="custom-control-description">Products</span>
									</label>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<SlideNavbarWrapper>
					<div className="row no-gutters">
						<div className='side-container hidden-md-down col-lg-2'>
							<div className="row">
								<div className="col-md-12">
								</div>
							</div>
						</div>
						<div className='col-md-12 col-lg-10'>
							<div className="main__header container-fluid">
								<div className="row align-center text-center">
									<div className="col-md-10 m-auto">
										<h5 className="heading-sub">Let us do the work - just one click away from trusted resources</h5>
										<h1 className="heading">Enter a topic, we will do the rest</h1>
										<form className="form form__search" onSubmit={(e)=>{e.preventDefault(); this.props.dispatch(getResults(this.props.searchTerm.label)); }}>	
											<div className="row no-gutters align-center text-center mt-4">
												<div className="col-md-8">
													<Field name="search" component={renderSearchField} options={this.props.resources && this.props.resources.map((item)=> { return { 'value': item.id, 'label': item.title } } )} label="Ex. Food, Medicine, Iphone, Gyms etc.." />
													
												</div>
												<div className="col-md-4">
													<input type="submit" className="btn btn-primary full-width" value="Search" />
													

												</div>
												<div className="col-md-12 mt-4">
													<input id="checkbox1" type="checkbox" /><label htmlFor="checkbox1">Results near me</label> &nbsp;<a href="#" className="text-center">Share results</a>
												</div>
											</div>
										</form>
									</div>
									<div className="col-md-8 mt-4">
										{this.props.searchTerm && <p className="h5 text-center"><i className="fa fa-search"></i> Results for <span className="highlight">"{this.props.searchTerm.label}"</span></p>}
										
									</div>
								</div>
							</div>
							<div className="main__body">
								<HomeSearchResults />
							</div>
						</div>
					</div>
						<Footer/>
					</SlideNavbarWrapper>
				
			</div>
		);
	}
}

const selector = formValueSelector('search')

HomePageDos = connect(store => { 
	let searchTerm = selector(store, 'search');

	return {
		searchTerm
	}
})(reduxForm({form: 'search', enableReinitialize: true})(HomePageDos));
export default HomePageDos;