import React, { Component } from 'react';
import {
	bs,
	currentMonth,
	currentYear,
	getNepaliNumber,
	getEnglishNumber,
	leapYears,
	getFormattedDay,
	getFormattedMonth,
	convertFullDateToNepali,
	getFullEnglishDate,
} from '../../utils/Config';
import Header from '../Header';
import NameOfDays from '../NameOfDays';
import adToBs from '../../utils/AdToBs';
import bsToAd from '../../utils/BsToAd';
import styles from './Calendar.module.css';
import RenderCalendar from './RenderCalendar';
class Calendar extends Component {
	static defaultProps = {
		onChange: () => {},
		className: '',
		language: 'NE',
		theme: 'default',
		dateFormat: 'YYYY-MM-DD',
		style: {},
		minDate: '',
		maxDate: '',
		defaultDate: '',
		hideDefaultValue: false,
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
		theme: 'default',
		hideDefaultValue: this.props.hideDefaultValue,
	};

	wrapperRef = React.createRef();
	inputRef = React.createRef();

	componentDidMount() {
		let { currentYear, currentMonth, currentDay } = adToBs();
		const language = this.validateLanguage(this.props.language);
		const theme = this.validateTheme(this.props.theme);
		const today =
			language === 'NE'
				? convertFullDateToNepali(currentYear + '-' + currentMonth + '-' + currentDay)
				: getFullEnglishDate(currentYear + '-' + currentMonth + '-' + currentDay);
		if (this.validateDate(this.props.defaultDate)) {
			const splittedDate = this.props.defaultDate.split('-');
			const year = parseInt(splittedDate[0]);
			const month = parseInt(splittedDate[1]);
			const day = parseInt(splittedDate[2]);

			if (year < 2000 && year > 2099 && month < 1 && month > 12) return -1;
			currentYear = year;
			currentMonth = month;
			currentDay = day;
		}
		this.setState(
			{
				currentYear,
				currentMonth,
				currentDay,
				today,
				language,
				theme,
			},
			() => {
				if (this.state.hideDefaultValue)
					this.formatDate(
						language === 'NE'
							? convertFullDateToNepali(currentYear + '-' + currentMonth + '-' + currentDay)
							: getFullEnglishDate(currentYear + '-' + currentMonth + '-' + currentDay)
					);
				else
					this.props.onChange(
						this.formatDate(
							language === 'NE'
								? convertFullDateToNepali(currentYear + '-' + currentMonth + '-' + currentDay)
								: getFullEnglishDate(currentYear + '-' + currentMonth + '-' + currentDay)
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
		if (
			this.state.showCalendar &&
			this.wrapperRef &&
			!this.wrapperRef.current.contains(event.target)
		) {
			this.setState({ showCalendar: false });
		}
	};

	validateTheme = (th) => {
		let theme = th || 'default';
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
		let language = ln || 'NE';
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
		const month = this.state.currentMonth;
		const year = this.state.currentYear;
		const diff = year - 2000;
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
		const month = this.state.currentMonth;
		const year = this.state.currentYear;
		const firstDay = this.calcFirstDay();
		const tbl = [];
		const daysInMonth = bs[year][month];
		let date = 1;
		for (var i = 0; i < 6; i++) {
			const row = [];
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
		const currentYear =
			this.state.currentMonth === 12 ? this.state.currentYear + 1 : this.state.currentYear;
		const currentMonth = (this.state.currentMonth + 1) % 13 ? this.state.currentMonth + 1 : 1;
		this.setState({ currentYear, currentMonth });
	};

	bsPrevious = () => {
		if (this.state.currentYear === 2000 && this.state.currentMonth === 1) {
			return -1;
		}
		const currentYear =
			this.state.currentMonth === 1 ? this.state.currentYear - 1 : this.state.currentYear;
		const currentMonth = this.state.currentMonth === 1 ? 12 : this.state.currentMonth - 1;
		this.setState({ currentYear, currentMonth });
	};

	bsMonthJump = (e) => {
		const currentMonth = parseInt(e.target.value);
		this.setState({ currentMonth });
	};

	bsYearJump = (e) => {
		const currentYear = parseInt(e.target.value);
		this.setState({ currentYear });
	};

	onDateClick = (day) => {
		if (!day) return -1;
		if (this.isDateToDisable(day)) return -1;
		const englishNumber = this.state.language === 'NE' ? getEnglishNumber(day) : day;
		this.setState({
			currentDay: englishNumber,
			selectedDate: `${this.state.currentYear}-${this.state.currentMonth}-${englishNumber}`,
			showCalendar: false,
			hideDefaultValue: false,
		});

		this.props.onChange(
			this.formatDate(
				this.state.language === 'NE'
					? convertFullDateToNepali(
							this.state.currentYear + '-' + this.state.currentMonth + '-' + englishNumber
					  )
					: getFullEnglishDate(
							this.state.currentYear + '-' + this.state.currentMonth + '-' + englishNumber
					  )
			)
		);
	};

	formatDate = (fullDate) => {
		const splittedDate = fullDate.split('-');

		if (splittedDate.length !== 3) {
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
		const weekendDay =
			(firstDay + (this.state.language === 'NE' ? getEnglishNumber(day) : parseInt(day)) - 1) % 7;
		let dateFormat = this.props.dateFormat ? this.props.dateFormat : 'YYYY-MM-DD';
		dateFormat = dateFormat.toUpperCase();
		// YYYY 2077
		// YYY 077
		// YY 77
		// M 1 - 12
		// MM 01-12
		// MMMM baishak, Jestha ....
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
		if (dateFormat.includes('MMMM')) {
			dateFormat = dateFormat.replace(
				'MMMM',
				getFormattedMonth(this.validateLanguage(this.props.language), month)
			);
		} else if (dateFormat.includes('MM')) {
			dateFormat = dateFormat.replace('MM', month);
		} else if (dateFormat.includes('M')) {
			dateFormat = dateFormat.replace(
				'M',
				(month[0] === '0') | (month[0] === '०') ? month.substring(1) : month
			);
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
			dateFormat = dateFormat.replace(
				'D',
				(day[0] === '0') | (day[0] === '०') ? day.substring(1) : day
			);
		}
		this.setState({ formatedDate: dateFormat });
		return { bsDate: dateFormat, adDate: AdDate };
	};

	isDateToDisable = (td) => {
		td = this.state.language === 'NE' ? getEnglishNumber(td) : td;
		const minDate = this.validateDate(this.props.minDate) ? this.props.minDate : '--';
		const maxDate = this.validateDate(this.props.maxDate) ? this.props.maxDate : '--';
		const splittedMinDate = minDate.split('-');
		const splittedMaxDate = maxDate.split('-');
		const minYear = parseInt(splittedMinDate[0]);
		const minMonth = parseInt(splittedMinDate[1]);
		const minDay = splittedMinDate[2];
		const maxYear = parseInt(splittedMaxDate[0]);
		const maxMonth = parseInt(splittedMaxDate[1]);
		const maxDay = parseInt(splittedMaxDate[2]);
		if (this.state.currentYear < minYear || this.state.currentYear > maxYear) {
			return true;
		} else if (
			(this.state.currentYear === minYear && this.state.currentMonth < minMonth) ||
			(this.state.currentYear === maxYear && this.state.currentMonth > maxMonth)
		) {
			return true;
		} else if (
			(this.state.currentYear === minYear &&
				this.state.currentMonth === minMonth &&
				td <= minDay) ||
			(this.state.currentYear === maxYear && this.state.currentMonth === maxMonth && td >= maxDay)
		) {
			return true;
		}
	};

	validateDate = (date) => {
		if (!date) {
			return false;
		}
		if (date.split('-').length !== 3) {
			return false;
		}

		// everything ok
		return true;
	};

	render() {
		return (
			<div style={{ position: 'relative' }}>
				<div
					ref={this.wrapperRef}
					style={{ top: this.inputRef.current ? this.inputRef.current.clientHeight + 5 : 31 }}
					className={`${styles['react-calendar']} ${
						styles['theme-react-calendar-' + this.state.theme]
					}`}
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
									className={`${styles['react-calendar__days']} ${
										styles['theme-react-calendar__days-' + this.state.theme]
									}`}
								>
									<NameOfDays language={this.state.language} />
								</div>
								<div
									className={`${styles['react-calendar__dates']} ${
										styles['theme-react-calendar__dates-' + this.state.theme]
									}`}
								>
									{' '}
									<RenderCalendar
										bsCalendar={this.bsCalendar}
										onDateClick={this.onDateClick}
										today={this.state.today}
										language={this.state.language}
										currentYear={this.state.currentYear}
										currentMonth={this.state.currentMonth}
										selectedDate={this.state.selectedDate}
										theme={this.state.theme}
										minDate={this.props.minDate}
										maxDate={this.props.maxDate}
										isDateToDisable={this.isDateToDisable}
									/>{' '}
								</div>
							</div>
						</div>
					)}
				</div>
				<input
					ref={this.inputRef}
					readOnly
					className={`${styles['react-calendar__input']} ${this.props.className}`}
					style={{ ...this.props.style }}
					placeholder={this.props.placeholder ?? 'select date'}
					onClick={() => this.setState({ showCalendar: true })}
					type='text'
					defaultValue={this.state.hideDefaultValue ? '' : this.state.formatedDate}
				/>
			</div>
		);
	}
}

export default Calendar;
