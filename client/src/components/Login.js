import { generateData, isFormValid, loginUser, update } from '../actions';

import { FormField } from '../utils';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Login = (props) => {
	const [state, setState] = React.useState({
		formError: false,
		formSuccess: '',
		formdata: {
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter your email',
				},
				validation: {
					required: true,
					email: true,
				},
				valid: false,
				touched: false,
				validationMessage: '',
			},
			password: {
				element: 'input',
				value: '',
				config: {
					name: 'password_input',
					type: 'password',
					placeholder: 'Enter your password',
				},
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
				validationMessage: '',
			},
		},
	});

	const updateForm = (element) => {
		const newFormdata = update(element, state.formdata, 'login');
		setState({
			...state,
			formError: false,
			formdata: newFormdata,
		});
	};

	const submitForm = (event) => {
		event.preventDefault();

		let dataToSubmit = generateData(state.formdata, 'login');
		let formIsValid = isFormValid(state.formdata, 'login');

		if (formIsValid) {
			props.dispatch(loginUser(dataToSubmit)).then((response) => {
				if (response.payload.loginSuccess) {
					console.log(response.payload);
					props.history.push('/user/dashboard');
				} else {
					setState({
						...state,
						formError: true,
					});
				}
			});
		} else {
			setState({
				...state,
				formError: true,
			});
		}
	};

	return (
		<div className="signin_wrapper">
			<form onSubmit={(event) => submitForm(event)}>
				<FormField
					id={'email'}
					formdata={state.formdata.email}
					change={(element) => updateForm(element)}
				/>

				<FormField
					id={'password'}
					formdata={state.formdata.password}
					change={(element) => updateForm(element)}
				/>

				{state.formError ? (
					<div className="error_label">Please check your data</div>
				) : null}
				<button onClick={(event) => submitForm(event)}>Log in</button>
			</form>
		</div>
	);
};

export default connect()(withRouter(Login));
