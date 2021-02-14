import React, { PureComponent } from 'react';
import { getEnglishNumber } from '../../utils/Config';
import styles from './Calendar.module.css';
export default class RenderCalendar extends PureComponent {
	render() {
		const { currentYear, currentMonth, language, today, selectedDate, theme } = this.props;
		return this.props.bsCalendar().map((tr, i) => (
			<React.Fragment key={i}>
				{tr.map((td, j) => (
					<span
						onClick={() => this.props.onDateClick(td)}
						key={j}
						className={`
						${!!td
							? `${styles['react-calendar__dates-date']} ${styles['theme-react-calendar__dates-date-' + theme]}`
							: `${styles['react-calendar__dates-null']} ${styles['theme-react-calendar__dates-null-' + theme]}`} 
						${today ===
						(language === 'NE'
							? this.props.convertFullDateToNepali(currentYear + '-' + currentMonth + '-' + getEnglishNumber(td))
							: this.props.getFullEnglishDate(currentYear + '-' + currentMonth + '-' + td))
							? `${styles['react-calendar__dates-date__today']} ${styles[
									'theme-react-calendar__dates-date__today-' + theme
								]}`
							: ''}
						${selectedDate ===
						(language === 'NE'
							? this.props.convertFullDateToNepali(currentYear + '-' + currentMonth + '-' + getEnglishNumber(td))
							: this.props.getFullEnglishDate(currentYear + '-' + currentMonth + '-' + td))
							? `${styles['react-calendar__dates-date__selected']} ${styles[
									'theme-react-calendar__dates-date__selected-' + theme
								]}`
							: ''}`}
					>
						{td}
					</span>
				))}
			</React.Fragment>
		));
	}
}
