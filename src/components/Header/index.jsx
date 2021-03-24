import React from 'react';
import styles from './Header.module.css';
import { monthsInNepali, monthsInEnglish, getNepaliNumber } from '../../utils/Config';
const Header = (props) => {
	const renderYear = () =>
		Array(2100 - 2000)
			.fill()
			.map((_, idx) => 2000 + idx)
			.map((val, i) => (
				<option key={i} value={val}>
					{props.language === 'NE' ? getNepaliNumber(val) : val}
				</option>
			));
	return (
		<div className={`${styles.header} ${styles['theme-header-' + props.theme]}`}>
			<p
				onClick={props.bsPrevious}
				className={`${styles.arrow} ${styles['arrow-left']} ${
					styles['theme-header-arrow-' + props.theme]
				} `}
			/>
			<div className={styles.header__mycontainer}>
				<select
					className={styles.header__mycontainer__select}
					value={props.currentMonth}
					onChange={props.bsMonthJump}
				>
					{props.language === 'NE'
						? monthsInNepali.map((mon, i) => (
								<option key={i} value={i + 1}>
									{mon}
								</option>
						  ))
						: monthsInEnglish.map((mon, i) => (
								<option key={i} value={i + 1}>
									{mon}
								</option>
						  ))}
				</select>
				<select
					className={styles.header__mycontainer__select}
					value={props.currentYear}
					onChange={props.bsYearJump}
				>
					{renderYear()}
				</select>
			</div>
			<p
				onClick={props.bsNext}
				className={`${styles.arrow} ${styles['arrow-right']} ${
					styles['theme-header-arrow-' + props.theme]
				}`}
			/>
		</div>
	);
};

export default Header;
