import React from 'react';
import Select, {Creatable} from 'react-select';

export default class SelectableField extends React.Component {
	constructor(props){
		super(props);
		this.state = { loaded: false };
	}

	capitalize = (str) => {
		return str.length ? str[0].toUpperCase() + str.slice(1).toLowerCase(): '';
	}

	normalizeValue = (value) => {
		if(value.value){
			return { value: value.value, label: this.capitalize(value.value) };
		}
		else if(value){
			return { value: value, label: this.capitalize(value) };
		}
	}

	componentWillReceiveProps(nextProps){

		console.log('SelectableField loaded', nextProps, this.normalizeValue(nextProps.input.value))
		//If we haven't loaded yet
		if(!this.state.loaded && (nextProps.input.value !== null || !nextProps.input.value) && this.props.input.value !== ""){
			this.props.hookValue && this.props.hookValue(this.normalizeValue(nextProps.input.value).value)

			console.log('not loaded nextProps', nextProps)
			this.setState({ 
				loaded: true, 
			});

			this.props.input.onChange(this.normalizeValue(nextProps.input.value));
		}
		else if(this.state.loaded && (nextProps.input.value !== null) && this.props.input.value !== "" && nextProps.input.value == this.props.input.value){
			console.log('loaded nextProps', nextProps, this.normalizeValue(nextProps.input.value), this.props)
			this.props.hookValue && this.props.hookValue(this.normalizeValue(nextProps.input.value).value)
			this.props.input.onChange(this.normalizeValue(nextProps.input.value));


		}
	}

	render(){
		const { input, label, meta: { touched, error }, errors, children, options, placeholder, clearable } = this.props;

		return (
			<div className='form-group'>
				<label>
				  {label}
				</label>
				<Select
					{...input}
					clearable={false}
					options = {options}
					placeholder = {placeholder}
					onBlur = {()=>{console.log('input value', input.value); input.onBlur(input.value); this.props.hookValue && this.props.hookValue(input.value.value) }}
					className={`form-control ${errors && 'is-invalid'}`}
				/>
				{errors && <small className={errors && 'invalid-feedback'}>{errors}</small>}
				{touched && error &&
				<span>
					{error}
				</span>}
			</div>
		)
	}
}
