import { bs } from './Config';
// start nepali date 2000-01-01  wednesday
// start english date 1943-04-14 wednesday

function adToBs() {
	const startDate = new Date('1943-04-14');
	const today = new Date();
	const daysDifference = Math.floor((today.getTime() - startDate.getTime()) / 86400000);
	return evaluateNepaliDate(daysDifference);
}

function evaluateNepaliDate(daysElpased) {
	let currentYear = 0;
	let currentMonth = 0;
	let currentDay = 0;
	let totalD = 0;
	let flag = false;
	for (let i = 2000; i < 2100; i++) {
		if (flag) {
			break;
		}
		for (let j = 1; j <= 12; j++) {
			totalD += bs[i][j];
			if (daysElpased - totalD < 0) {
				currentDay = daysElpased - totalD + bs[i][j] + 1;
				flag = true;
				currentYear = i;
				currentMonth = j;
				break;
			}
		}
	}
	return { currentYear, currentMonth, currentDay };
}

export default adToBs;
