import { daysInNepali, daysInEnglish } from '../utils/Config.js';
import styles from './Calendar/Calendar.module.css';

const NameOfDays = (props: { language: string }) => {
	return props.language === 'NE'
		? daysInNepali.map((el, i) => (
				<span className={styles['react-calendar__days-day']} key={i}>
					{el}
				</span>
			))
		: daysInEnglish.map((el, i) => (
				<span className={styles['react-calendar__days-day']} key={i}>
					{el}
				</span>
			));
};

export default NameOfDays;
