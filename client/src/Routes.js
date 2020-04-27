import { Route, Switch } from 'react-router-dom';

import { Home } from './components';
import { Layout } from './hoc';
import React from 'react';

const Routes = () => {
	return (
		<Layout>
			<Switch>
				<Route path="/" exact component={Home} />
			</Switch>
		</Layout>
	);
};

export default Routes;
