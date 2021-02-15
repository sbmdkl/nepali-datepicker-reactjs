# @sbmdkl/nepali-datepicker-reactjs

> Nepali Datepicker Reactjs

[![NPM](https://img.shields.io/npm/v/@sbmdkl/nepali-datepicker-reactjs.svg)](https://www.npmjs.com/package/@sbmdkl/nepali-datepicker-reactjs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


![default](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/12e57f6d-a2ee-4352-8b73-85971acdf06d.png)
![blue](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/bc421c42-711a-438e-878c-53cffcb0db77.png)
![dark](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/97c76561-56b3-4ce3-85fb-2ad7b8d2427b.png)
![red](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/27a40071-390f-4908-8c58-7dd912840a99.png)
![deepdark](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/ed397da4-a4eb-4269-8d6a-b03714c25bc2.png)
![green](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/8ff06f5e-cd55-40e0-8d8a-fa9a9e3a06e6.png)

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
