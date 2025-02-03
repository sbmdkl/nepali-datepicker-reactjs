import styles from './Header.module.css';
import { monthsInNepali, monthsInEnglish, getNepaliNumber } from '../../utils/Config';

interface Props {
	language: string;
	theme: string;
	currentMonth: number;
	currentYear: number;
	bsPrevious: () => -1 | undefined;
	bsNext: () => -1 | undefined;
	bsMonthJump: React.ChangeEventHandler<HTMLSelectElement>
	bsYearJump: React.ChangeEventHandler<HTMLSelectElement>
}

const Header = (props: Props) => {
	const renderYear = () =>
		Array.from({ length: 100 }, (_, i) => 2000 + i).map((val, i) => (
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
