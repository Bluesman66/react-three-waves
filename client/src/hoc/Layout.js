import { Footer, Header } from '../components';

import React from 'react';

const Layout = (props) => {
	return (
		<div>
			<Header />
			<div className="page_container">{props.children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
