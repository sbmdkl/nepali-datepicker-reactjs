import React, { PureComponent } from 'react';
import {
  getEnglishNumber,
  convertFullDateToNepali,
  getFullEnglishDate,
} from '../../utils/Config';
import styles from './Calendar.module.css';

interface RenderCalendarProps {
  language: string;
  currentYear: number;
  currentMonth: number;
  today: string;
  selectedDate: string;
  theme: string;
  isDateToDisable: (date: number | string) => boolean;
  bsCalendar: () => (string | number | null)[][];
  onDateClick: (date: string | number | null) => void;
}

export default class RenderCalendar extends PureComponent<RenderCalendarProps> {
  getDate = (td: string | number | null): string | -1 => {
    if (td === null) return '';
    return this.props.language === 'NE'
      ? convertFullDateToNepali(
          `${this.props.currentYear}-${this.props.currentMonth}-${getEnglishNumber(td)}`
        )
      : getFullEnglishDate(`${this.props.currentYear}-${this.props.currentMonth}-${td}`);
  };

  applyTodayCss = (td: string | number | null): string => {
    if (td === null) return '';
    return this.props.today === this.getDate(td)
      ? `${styles['react-calendar__dates-date__today']} ${styles['theme-react-calendar__dates-date__today-' + this.props.theme]}`
      : '';
  };

  applySelectedDateCss = (td: string | number | null): string => {
    if (td === null) return '';
    return this.props.selectedDate === this.getDate(td)
      ? `${styles['react-calendar__dates-date__selected']} ${styles['theme-react-calendar__dates-date__selected-' + this.props.theme]}`
      : '';
  };

  applyDisabledDateCss = (td: string | number | null): string => {
    if (td === null) return '';
    return this.props.isDateToDisable(td)
      ? `${styles['react-calendar__dates-date__disabled']} ${styles['theme-react-calendar__dates-date__disabled-' + this.props.theme]}`
      : '';
  };

  applyDateCss = (td: string | number | null): string => {
    return td !== null
      ? `${styles['react-calendar__dates-date']} ${styles['theme-react-calendar__dates-date-' + this.props.theme]}`
      : `${styles['react-calendar__dates-null']} ${styles['theme-react-calendar__dates-null-' + this.props.theme]}`;
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
            {td !== null ? td : ''}
          </span>
        ))}
      </React.Fragment>
    ));
  }
}
