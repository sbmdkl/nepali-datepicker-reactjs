import React, { PureComponent } from 'react';
import { getEnglishNumber, convertFullDateToNepali, getFullEnglishDate } from '../../utils/Config';
import styles from './Calendar.module.css';
export default class RenderCalendar extends PureComponent {
	getDate = (td) => {
		return this.props.language === 'NE'
			? convertFullDateToNepali(
					this.props.currentYear + '-' + this.props.currentMonth + '-' + getEnglishNumber(td)
			  )
			: getFullEnglishDate(this.props.currentYear + '-' + this.props.currentMonth + '-' + td);
	};

	applyTodayCss = (td) => {
		return this.props.today === this.getDate(td)
			? `${styles['react-calendar__dates-date__today']} ${
					styles['theme-react-calendar__dates-date__today-' + this.props.theme]
			  }`
			: '';
	};

	applySelectedDateCss = (td) => {
		return this.props.selectedDate === this.getDate(td)
			? `${styles['react-calendar__dates-date__selected']} ${
					styles['theme-react-calendar__dates-date__selected-' + this.props.theme]
			  }`
			: '';
	};

	applyDisabledDateCss = (td) => {
		return this.props.isDateToDisable(td)
			? `${styles['react-calendar__dates-date__disabled']} ${
					styles['theme-react-calendar__dates-date__disabled-' + this.props.theme]
			  }`
			: '';
	};

	applyDateCss = (td) => {
		return td
			? `${styles['react-calendar__dates-date']} ${
					styles['theme-react-calendar__dates-date-' + this.props.theme]
			  }`
			: `${styles['react-calendar__dates-null']} ${
					styles['theme-react-calendar__dates-null-' + this.props.theme]
			  }`;
	};

	render() {
		return this.props.bsCalendar().map((tr, i) => (
			<React.Fragment key={i}>
				{tr.map((td, j) => (
					<span
						onClick={() => this.props.onDateClick(td)}
						key={j}
						className={`
						${this.applyDateCss(td)} 
						${this.applyTodayCss(td)}
						${this.applySelectedDateCss(td)}
						${this.applyDisabledDateCss(td)}`}
					>
						{td}
					</span>
				))}
			</React.Fragment>
		));
	}
}
