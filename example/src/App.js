import React from 'react';

import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

class App extends React.Component {
	componentDidMount() {}
	state = {
		date: '',
	};
	onChange = ({ bsDate, adDate }) => {
		console.log(adDate);
		this.setState({ date: bsDate });
	};
	render() {
		return (
			<div style={{ marginLeft: 100 }}>
				<Calendar
					onChange={this.onChange}
					language='ne'
					theme='default'
					dateFormat='DDDD, MMMM DD, YYYY'
					minDate='2077-12-10'
					maxDate='2077-12-30'
					defaultDate='2077-12-12'
				/>
			</div>
		);
	}
}

export default App;
