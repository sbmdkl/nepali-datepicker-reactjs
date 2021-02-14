import React from 'react';

import Calendar from 'nepali-datepicker-reactjs';
import 'nepali-datepicker-reactjs/dist/index.css';

class App extends React.Component {
	componentDidMount() {}
	state = {
		date: ''
	};
	onChange = ({ bsDate, adDate }) => {
		console.log(adDate);
		this.setState({ date: bsDate });
	};
	render() {
		return (
			<div style={{ marginLeft: 100 }}>
				<Calendar onChange={this.onChange} language='ne' dateFormat='DDDD, DD/MM/YYYY' theme='deepdark' />
			</div>
		);
	}
}

export default App;
