import React from 'react';

export const renderTextAreaField = ({ input, label, meta: { touched, error }, errors, children, options, placeholder }) => 
<div className={errors ? 'has-danger' : ''}>
	<textarea {...input} placeholder={placeholder} className="form-control">
	</textarea>
</div> 

export const renderTextField = ({ input, label, type, meta: { touched, error }, errors, placeholder }) =>
<div className={errors ? 'has-danger form-group' : 'form-group'}>
	<label>
	  {label}
	</label>
  	<input {...input} placeholder={placeholder} type={type} className="form-control" />
	{errors && <small className="form-control-feedback">{errors}</small>}
	{touched && error &&
	<span>
		{error}
	</span>}
</div>

