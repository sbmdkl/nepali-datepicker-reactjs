# @sbmdkl/nepali-datepicker-reactjs

> Nepali Datepicker Reactjs

[![NPM](https://img.shields.io/npm/v/@sbmdkl/nepali-datepicker-reactjs.svg)](https://www.npmjs.com/package/@sbmdkl/nepali-datepicker-reactjs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @sbmdkl/nepali-datepicker-reactjs
```

## Usage

```jsx
import React from 'react';

import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

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
				<Calendar onChange={this.onChange} />
			</div>
		);
	}
}

export default App;

```

## License

MIT © [Shubham Dhakal](https://github.com/sbmdkl)
