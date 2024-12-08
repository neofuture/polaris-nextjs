import React, { useState, useEffect } from 'react';
import styles from './date-picker.module.css';
import {
    format,
    addMonths,
    subMonths,
    addYears,
    subYears,
    startOfMonth,
    startOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isToday,
    isSameDay,
    addDays
} from 'date-fns';

interface DatePickerProps {
    selected?: Date | null;
    onChange?: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selected, onChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(selected || null);

    useEffect(() => {
        setSelectedDate(selected || null);
    }, [selected]);

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const handlePrevYear = () => {
        setCurrentDate(subYears(currentDate, 1));
    };

    const handleNextYear = () => {
        setCurrentDate(addYears(currentDate, 1));
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        if (onChange) {
            onChange(date);
        }
        if (!isSameMonth(date, currentDate)) {
            setCurrentDate(startOfMonth(date));
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, date: Date) => {
        if (event.key === ' ') {
            event.preventDefault();
            handleDateClick(date);
        }
    };

    const getDayWithSuffix = (day: number) => {
        if (day > 3 && day < 21) return `${day}th`;
        switch (day % 10) {
            case 1: return `${day}st`;
            case 2: return `${day}nd`;
            case 3: return `${day}rd`;
            default: return `${day}th`;
        }
    };

    const handleChevronKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, action: () => void) => {
        if (event.key === ' ') {
            event.preventDefault();
            action();
        }
    };

    const renderHeader = () => {
        const day = currentDate.getDate();
        const month = format(currentDate, 'MMMM yyyy');
        return (
            <div className={styles.header}>
                <div
                    className={styles['chevron-wrapper']}
                    onClick={handlePrevYear}
                    onKeyDown={(event) => handleChevronKeyDown(event, handlePrevYear)}
                    tabIndex={0}
                >
                    <i className={`fas fa-angle-double-left ${styles.chevron}`}></i>
                </div>
                <div
                    className={styles['chevron-wrapper']}
                    onClick={handlePrevMonth}
                    onKeyDown={(event) => handleChevronKeyDown(event, handlePrevMonth)}
                    tabIndex={0}
                >
                    <i className={`fas fa-chevron-left ${styles.chevron}`}></i>
                </div>
                <div className={styles['current-date']}>
                    {`${getDayWithSuffix(day)} ${month}`}
                </div>
                <div
                    className={styles['chevron-wrapper']}
                    onClick={handleNextMonth}
                    onKeyDown={(event) => handleChevronKeyDown(event, handleNextMonth)}
                    tabIndex={0}
                >
                    <i className={`fas fa-chevron-right ${styles.chevron}`}></i>
                </div>
                <div
                    className={styles['chevron-wrapper']}
                    onClick={handleNextYear}
                    onKeyDown={(event) => handleChevronKeyDown(event, handleNextYear)}
                    tabIndex={0}
                >
                    <i className={`fas fa-angle-double-right ${styles.chevron}`}></i>
                </div>
            </div>
        );
    };

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return (
            <div className={styles['days-of-week']}>
                {daysOfWeek.map((day, index) => (
                    <div key={index} className={styles['day-of-week']}>
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderDays = () => {
        const startDate = startOfWeek(startOfMonth(currentDate));
        const endDate = addDays(startDate, 6 * 7 - 1); // Always show 6 weeks
        const days = eachDayOfInterval({start: startDate, end: endDate});

        return (
            <div className={styles.days}>
                {days.map((day: Date, index: number) => (
                    <div
                        key={index}
                        className={`
                        ${styles.day}
                        ${!isSameMonth(day, currentDate) ? styles['outside-month'] : ''}
                        ${isToday(day) ? styles.today : ''}
                        ${selectedDate && isSameDay(day, selectedDate) ? styles.selected : ''}
                    `}
                        onClick={() => handleDateClick(day)}
                        onKeyDown={(event) => handleKeyDown(event, day)}
                        tabIndex={0}
                    >
                        {format(day, 'd')}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles['date-picker']}>
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderDays()}
        </div>
    );
};

export default DatePicker;