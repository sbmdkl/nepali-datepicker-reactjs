import React from 'react';
import { daysInNepali, daysInEnglish } from '../utils/Config.js';
import styles from './Calendar/Calendar.module.css';
const NameOfDays = (props) => {
	return (
		<React.Fragment>
			{props.language === 'NE'
				? daysInNepali.map((el, i) => (
						<span className={styles['react-calendar__days-day']} key={i}>
							{el}
						</span>
				  ))
				: daysInEnglish.map((el, i) => (
						<span className={styles['react-calendar__days-day']} key={i}>
							{el}
						</span>
				  ))}
		</React.Fragment>
	);
};

export default NameOfDays;
