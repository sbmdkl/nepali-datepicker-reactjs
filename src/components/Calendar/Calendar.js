import React, { Component } from 'react';
import {
	bs,
	currentMonth,
	currentYear,
	getNepaliNumber,
	getEnglishNumber,
	leapYears,
	getFormattedDay
} from '../../utils/Config';
import Header from '../Header';
import NameOfDays from '../NameOfDays';
import adToBs from '../../utils/AdToBs';
import bsToAd from '../../utils/BsToAd';
import styles from './Calendar.module.css';
import RenderCalendar from './RenderCalendar';
class Calendar extends Component {
	static defaultProps = {
		onChange: () => {}
	};
	wrapperRef = React.createRef();
	inputRef = React.createRef();
	componentDidMount() {
		const { currentYear, currentMonth, currentDay } = adToBs();
		const language = this.validateLanguage(this.props.language);
		const theme = this.validateTheme(this.props.theme);
		const today =
			language === 'NE'
				? this.convertFullDateToNepali(currentYear + '-' + currentMonth + '-' + currentDay)
				: this.getFullEnglishDate(currentYear + '-' + currentMonth + '-' + currentDay);
		this.setState(
			{
				currentYear,
				currentMonth,
				currentDay,
				today,
				language,
				theme
			},
			() => {
				this.props.onChange(
					this.formatDate(
						language === 'NE'
							? this.convertFullDateToNepali(currentYear + '-' + currentMonth + '-' + currentDay)
							: this.getFullEnglishDate(currentYear + '-' + currentMonth + '-' + currentDay)
					)
				);
			}
		);
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	handleClickOutside = (event) => {
		if (this.state.showCalendar && this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
			this.setState({ showCalendar: false });
		}
	};

	state = {
		currentMonth,
		currentYear,
		currentDay: 1,
		dates: [],
		showCalendar: false,
		selectedDate: '',
		today: '',
		language: 'NE',
		theme: 'default'
	};

	validateTheme = (th) => {
		let theme = th ? th : 'default';
		theme = theme.toString().toLowerCase();
		switch (theme) {
			case 'red':
				theme = 'red';
				break;
			case 'blue':
				theme = 'blue';
				break;
			case 'green':
				theme = 'green';
				break;
			case 'dark':
				theme = 'dark';
				break;
			case 'deepdark':
				theme = 'deepdark';
				break;

			default:
				theme = 'default';
				break;
		}
		return theme;
	};

	validateLanguage = (ln) => {
		let language = ln ? ln : 'NE';
		language = language.toString().toUpperCase();
		let lang = 'NE';
		switch (language) {
			case 'EN':
			case 'ENGLISH':
				lang = 'EN';
				break;

			default:
				lang = 'NE';
				break;
		}
		return lang;
	};

	calcFirstDay = () => {
		let month = this.state.currentMonth;
		let year = this.state.currentYear;
		let diff = year - 2000;
		let leapYear = 0;
		let firstDay;
		for (let l = 0; l < leapYears.length; l++) {
			if (year > leapYears[l]) {
				leapYear++;
			}
		}
		if (year > 2096) {
			leapYear--;
		}
		let td = 3 + diff * 365 + leapYear;
		if (month - 1 > 0) {
			for (let i = 1; i < month; i++) {
				td += bs[year][i];
			}
			firstDay = td % 7;
		} else {
			firstDay = td % 7;
		}
		td = 0;
		return firstDay;
	};
	bsCalendar = () => {
		let month = this.state.currentMonth;
		let year = this.state.currentYear;
		const firstDay = this.calcFirstDay();
		let tbl = [];
		let daysInMonth = bs[year][month];
		let date = 1;
		for (var i = 0; i < 6; i++) {
			let row = [];
			for (var j = 0; j < 7; j++) {
				if (i === 0 && j < firstDay) {
					row.push('');
				} else if (date > daysInMonth) {
					row.push('');
				} else {
					// convert when lang is nepali
					if (this.state.language === 'NE') {
						const convertToNepali = getNepaliNumber(date);
						row.push(convertToNepali);
					} else {
						row.push(date);
					}
					date++;
				}
			}
			tbl.push(row);
		}
		return tbl;
	};

	bsNext = () => {
		if (this.state.currentYear === 2099 && this.state.currentMonth === 12) {
			return -1;
		}
		let currentYear = this.state.currentMonth === 12 ? this.state.currentYear + 1 : this.state.currentYear;
		let currentMonth = (this.state.currentMonth + 1) % 13 ? this.state.currentMonth + 1 : 1;
		this.setState({ currentYear, currentMonth });
	};

	bsPrevious = () => {
		if (this.state.currentYear === 2000 && this.state.currentMonth === 1) {
			return -1;
		}
		let currentYear = this.state.currentMonth === 1 ? this.state.currentYear - 1 : this.state.currentYear;
		let currentMonth = this.state.currentMonth === 1 ? 12 : this.state.currentMonth - 1;
		this.setState({ currentYear, currentMonth });
	};

	bsMonthJump = (e) => {
		let currentMonth = parseInt(e.target.value);
		this.setState({ currentMonth });
	};
	bsYearJump = (e) => {
		let currentYear = parseInt(e.target.value);
		this.setState({ currentYear });
	};
	onDateClick = (day) => {
		if (!day) return -1;
		const englishNumber = this.state.language === 'NE' ? getEnglishNumber(day) : day;
		this.setState({
			currentDay: day,
			selectedDate: `${this.state.currentYear}-${this.state.currentMonth}-${englishNumber}`,
			showCalendar: false
		});

		this.props.onChange(
			this.formatDate(
				this.state.language === 'NE'
					? this.convertFullDateToNepali(this.state.currentYear + '-' + this.state.currentMonth + '-' + englishNumber)
					: this.getFullEnglishDate(this.state.currentYear + '-' + this.state.currentMonth + '-' + englishNumber)
			)
		);
	};
	getFullEnglishDate = (englishDate) => {
		const splittedDate = englishDate.split('-');
		if (splittedDate.length != 3) {
			console.log('error spliting the date');
		}

		const year = splittedDate[0];
		const month = splittedDate[1];
		const day = splittedDate[2];
		const selectedDate = `${year}-${splittedDate[1] > 9 ? month : '0' + month}-${splittedDate[2] > 9
			? day
			: '0' + day}`;
		return selectedDate;
	};
	convertFullDateToNepali = (englishDate) => {
		const splittedDate = englishDate.split('-');
		if (splittedDate.length != 3) {
			console.log('error spliting the date');
			return -1;
		}
		const year = getNepaliNumber(splittedDate[0]);
		const month = getNepaliNumber(splittedDate[1]);
		const day = getNepaliNumber(splittedDate[2]);
		const selectedNepaliDate = `${year}-${splittedDate[1] > 9 ? month : '०' + month}-${splittedDate[2] > 9
			? day
			: '०' + day}`;
		return selectedNepaliDate;
	};

	formatDate = (fullDate) => {
		const splittedDate = fullDate.split('-');

		if (splittedDate.length != 3) {
			console.log('error spliting the date');
			return -1;
		}
		this.setState({ selectedDate: fullDate });
		const year = splittedDate[0];
		const month = splittedDate[1];
		const day = splittedDate[2];

		const AdDate = bsToAd(
			this.state.language === 'NE'
				? getEnglishNumber(year) + '-' + getEnglishNumber(month) + '-' + getEnglishNumber(day)
				: year + '-' + month + '-' + day
		);
		const firstDay = this.calcFirstDay();
		const weekendDay = (firstDay + (this.state.language === 'NE' ? getEnglishNumber(day) : parseInt(day)) - 1) % 7;
		let dateFormat = this.props.dateFormat ? this.props.dateFormat : 'YYYY-MM-DD';
		dateFormat = dateFormat.toUpperCase();
		// YYYY 2077
		// YYY 077
		// YY 77
		// M 1 - 12
		// MM 01-12
		// D  1-30
		// DD 01-30
		// DDD Sun, Mon ....
		// DDDD Sunday, Monday ....

		// Year format
		if (dateFormat.includes('YYYY')) {
			dateFormat = dateFormat.replace('YYYY', year);
		} else if (dateFormat.includes('YYY')) {
			dateFormat = dateFormat.replace('YYY', year.toString().slice(1, 4));
		} else if (dateFormat.includes('YY')) {
			dateFormat = dateFormat.replace('YY', year.toString().slice(2, 4));
		}
		// Month Format
		if (dateFormat.includes('MM')) {
			dateFormat = dateFormat.replace('MM', month);
		} else if (dateFormat.includes('M')) {
			dateFormat = dateFormat.replace('M', (month[0] === '0') | (month[0] === '०') ? month.substring(1) : month);
		}
		// weekdays format
		if (dateFormat.includes('DDDD')) {
			dateFormat = dateFormat.replace(
				'DDDD',
				getFormattedDay(this.validateLanguage(this.props.language), 'DDDD', weekendDay)
			);
		} else if (dateFormat.includes('DDD')) {
			dateFormat = dateFormat.replace(
				'DDD',
				getFormattedDay(this.validateLanguage(this.props.language), 'DDD', weekendDay)
			);
		}
		// Day Format
		if (dateFormat.includes('DD')) {
			dateFormat = dateFormat.replace('DD', day);
		} else if (dateFormat.includes('D')) {
			dateFormat = dateFormat.replace('D', (day[0] === '0') | (day[0] === '०') ? day.substring(1) : day);
		}
		this.setState({ formatedDate: dateFormat });
		return { bsDate: dateFormat, adDate: AdDate };
	};

	render() {
		return (
			<div style={{ position: 'relative' }}>
				<div
					ref={this.wrapperRef}
					style={{ top: this.inputRef.current ? this.inputRef.current.clientHeight + 5 : 31 }}
					className={`${styles['react-calendar']} ${styles['theme-react-calendar-' + this.state.theme]}`}
				>
					{this.state.showCalendar && (
						<div className=''>
							<Header
								currentMonth={this.state.currentMonth}
								currentYear={this.state.currentYear}
								bsNext={this.bsNext}
								bsPrevious={this.bsPrevious}
								bsMonthJump={this.bsMonthJump}
								bsYearJump={this.bsYearJump}
								language={this.state.language}
								theme={this.state.theme}
							/>
							<div className={styles['react-calendar__body']}>
								<div
									className={`${styles['react-calendar__days']} ${styles[
										'theme-react-calendar__days-' + this.state.theme
									]}`}
								>
									<NameOfDays language={this.state.language} />
								</div>
								<div
									className={`${styles['react-calendar__dates']} ${styles[
										'theme-react-calendar__dates-' + this.state.theme
									]}`}
								>
									{' '}
									<RenderCalendar
										bsCalendar={this.bsCalendar}
										onDateClick={this.onDateClick}
										convertFullDateToNepali={this.convertFullDateToNepali}
										getFullEnglishDate={this.getFullEnglishDate}
										today={this.state.today}
										language={this.state.language}
										currentYear={this.state.currentYear}
										currentMonth={this.state.currentMonth}
										selectedDate={this.state.selectedDate}
										theme={this.state.theme}
									/>{' '}
								</div>
							</div>
						</div>
					)}
				</div>
				<input
					ref={this.inputRef}
					readOnly={true}
					className={styles['react-calendar__input']}
					style={{ ...this.props.style }}
					placeholder='select date'
					onClick={() => this.setState({ showCalendar: true })}
					type='text'
					defaultValue={this.state.formatedDate}
				/>
			</div>
		);
	}
}

export default Calendar;
