import React from 'react';
import axios from 'axios';

function App() {
	React.useEffect(() => {
		axios.get('/api/product/brands').then((res) => {
			console.log(res.data);
		});
		return () => {};
	});

	return <div>MY APP</div>;
}

export default App;
