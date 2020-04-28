import { Route, Switch } from 'react-router-dom';

import { Home } from './components';
import { Layout } from './hoc';
import React from 'react';
import { RegisterLogin } from './components';

const Routes = () => {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/register-login" exact component={RegisterLogin} />
			</Switch>
		</Layout>
	);
};

export default Routes;
