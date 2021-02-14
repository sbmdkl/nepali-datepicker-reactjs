import { bs } from './Config';
// start nepali date 2000-01-01  wednesday
// start english date 1943-04-14 wednesday

function bsToAd(selectedDate) {
	const splittedDate = selectedDate.split('-');
	const year = parseInt(splittedDate[0]);
	const month = parseInt(splittedDate[1]);
	const day = parseInt(splittedDate[2]);
	let daysDiff = 0;
	for (let i = 2000; i <= year; i++) {
		if (i === year) {
			for (let j = 1; j < month; j++) {
				daysDiff += bs[i][j];
			}
			daysDiff += day - 1;
		} else {
			for (let j = 1; j <= 12; j++) {
				daysDiff += bs[i][j];
			}
		}
	}
	return evaluateEnglishDate('1943-04-14', daysDiff);
}

function evaluateEnglishDate(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	const year = result.getFullYear();
	const month = result.getMonth() + 1;
	const day = result.getDate();
	return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`;
}

export default bsToAd;
