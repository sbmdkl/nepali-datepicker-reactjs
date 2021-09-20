# @sbmdkl/nepali-datepicker-reactjs

[![NPM](https://img.shields.io/npm/v/@sbmdkl/nepali-datepicker-reactjs.svg)](https://www.npmjs.com/package/@sbmdkl/nepali-datepicker-reactjs) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A simple and reusable Datepicker component for React <a href="https://sbmdkl.github.io/nepali-datepicker-reactjs/#/">Read Full Documentation</a>.

## Installation

```bash
npm install @sbmdkl/nepali-datepicker-reactjs
```

![default](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/12e57f6d-a2ee-4352-8b73-85971acdf06d.png)
![blue](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/bc421c42-711a-438e-878c-53cffcb0db77.png)
![dark](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/97c76561-56b3-4ce3-85fb-2ad7b8d2427b.png)
![red](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/27a40071-390f-4908-8c58-7dd912840a99.png)
![deepdark](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/ed397da4-a4eb-4269-8d6a-b03714c25bc2.png)
![green](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/8ff06f5e-cd55-40e0-8d8a-fa9a9e3a06e6.png)

## Usage

```jsx
//Class Component
import React from 'react';

import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

class App extends React.Component {
	state = { date: '' };

	onChange = ({ bsDate, adDate }) => {
		this.setState({ date: bsDate });
	};

	render() {
		return (
			<div>
				<Calendar onChange={this.onChange} />
			</div>
		);
	}
}

export default App;
```

```jsx
//Functional Component
import React, { useState } from 'react';

import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

function App() {
	const [date, setDate] = useState('');

	const handleDate = ({ bsDate, adDate }) => {
		setDate({ date: bsDate });
	};
	return (
		<div>
			<h1>Nepali Date Picker for React</h1>
			<Calendar onChange={handleDate} theme='deepdark' />
		</div>
	);
}

export default App;
```

## User guide

#### Props

| Prop name   | Description                                                                                                                           | Default value | Example values                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------ |
| className   | Custom class to input field of calendar.                                                                                              | n/a           | `'form-control'`                           |
| defaultDate | Default date to start the calendar. Date format must be `YYYY-MM-DD` and in english number                                            | `n/a`         | `"YYYY/MM/DD"`                             |
| dateFormat  | Input Date Format. Supported values are: `YYYY`,`YYY`,`YY`, `M`, `MM`, `MMMM`, `D`, `DD`, `DDD`, `DDDD`.                              | YYYY-MM-DD    | `"YYYY/MM/DD"`                             |
| language    | Language options are: `en` or `ne`. Shows the calendar in different language.                                                         | `ne`          | `"ne"`                                     |
| minDate     | Mininum date, below minimum date (included) all dates are disabled. Date format must be `YYYY-MM-DD` and in english number            | `n/a`         | `"2077-10-20"`                             |
| maxDate     | Maximum date, above maximum date (included) all dates are disabled. Date format must be `YYYY-MM-DD` and in english number            | `n/a`         | `"2077-12-05"`                             |
| onChange    | Function called when the user clicks an item on the most detailed view available. Returns both selected nepali date and english date. | n/a           | `(value) => alert('New date is: ', value)` |
| style       | Custom style to input field of calendar.                                                                                              | n/a           | `{{color:'red'}}`                          |
| theme       | Use multi theme availabe by defaults. Theme supports : `red` `blue` `green` `dark` `deepdark` `default`.                              | `default`     | `"red"`                                    |
| hideDefaultValue       | hide initial date value in the input                           | `false`     | `true`                                    |
| placeholder       | Your custom placeholder | `n/a`     | `"Select Date"`                                    |

## dateFormat

Format the date to provide various output based on format string

<pre>
YYYY - 4 digit of year (२०७७)
YYY  - 3 digit of year (०७७)
YY   - 2 digit of year (७७)
M    - month number (१ - १२)
MM   - month number with 0 padding - (०१-१२)
MMMM - Full month name (बैशाख, जेठ, ...)
D    - Day of Month (१, २, ३ ... ३१, ३२)
DD   - Day of Month with zero padding (०१, ०२, ...)
DDD  - Day of week in short form (आइत, सोम, ...)
DDDD - Day of week full form  (आइतबार, सोमबार, ...)
</pre>

Date Format output will auto change with the language.
If language is set to english `en`, then YYYY will shows 2077, 2078 ...,
similarily output of DDDD will shows Sunday, Monday ...

### dateFormat Usage

```jsx
<Calendar onChange={this.onChange} dateFormat='DDDD, YYYY-MM-DD' />
```

output: सोमवार, २०७७-११-०३

```jsx
<Calendar onChange={this.onChange} dateFormat='DDDD, MMMM DD, YYYY' />
```

output: शुक्रवार, फाल्गुन १४, २०७७

```jsx
<Calendar onChange={this.onChange} language='en' dateFormat='DDDD, MMMM DD, YYYY' />
```

output: Friday, Falgun 14, 2077

### Get Ad date of selected Date

```jsx
// both Ad and BS dates are passed to onChange on each date selected
onChange = ({ bsDate, adDate }) => {
	this.setState({ date: bsDate });
};
```

### Using with language and theme

```jsx
import React from 'react';

import Calendar from '@sbmdkl/nepali-datepicker-reactjs';
import '@sbmdkl/nepali-datepicker-reactjs/dist/index.css';

class App extends React.Component {
	state = { date: '' };

	onChange = ({ bsDate, adDate }) => {
		this.setState({ date: bsDate });
	};

	render() {
		return (
			<div>
				<Calendar
					onChange={this.onChange}
					language='en'
					theme='deepdark'
					dateFormat='DDDD, YYYY-MM-DD'
				/>
			</div>
		);
	}
}

export default App;
```

Output:

![output](https://raw.githubusercontent.com/sbmdkl/nepali-datepicker-reactjs/main/blob/images/0142e689-6c38-4693-bfa0-a78e22ad6ec5%20.png)

## License

MIT © [Shubham Dhakal](https://github.com/sbmdkl)
