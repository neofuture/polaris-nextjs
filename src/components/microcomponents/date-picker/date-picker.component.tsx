import React, { useState, useEffect, useRef } from 'react';
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
    addDays,
    subDays
} from 'date-fns';
import Button from '@/components/microcomponents/button/button.component';

interface DatePickerProps {
    selected?: Date | null;
    onChange?: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selected, onChange }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(selected || null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [focusedDate, setFocusedDate] = useState<Date | null>(null);
    const focusedDateRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setSelectedDate(selected || null);
    }, [selected]);

    useEffect(() => {
        if (focusedDateRef.current) {
            focusedDateRef.current.focus();
        }
    }, [focusedDate]);

    const handlePrevMonth = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentDate(subMonths(currentDate, 1));
            setIsTransitioning(false);
        }, 300);
    };

    const handleNextMonth = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentDate(addMonths(currentDate, 1));
            setIsTransitioning(false);
        }, 300);
    };

    const handlePrevYear = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentDate(subYears(currentDate, 1));
            setIsTransitioning(false);
        }, 300);
    };

    const handleNextYear = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentDate(addYears(currentDate, 1));
            setIsTransitioning(false);
        }, 300);
    };

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        if (onChange) {
            onChange(date);
        }
        if (!isSameMonth(date, currentDate)) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentDate(startOfMonth(date));
                setIsTransitioning(false);
            }, 300);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, date: Date) => {
        let newDate = date;
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                newDate = subDays(date, 7);
                break;
            case 'ArrowDown':
                event.preventDefault();
                newDate = addDays(date, 7);
                break;
            case 'ArrowLeft':
                event.preventDefault();
                newDate = subDays(date, 1);
                break;
            case 'ArrowRight':
                event.preventDefault();
                newDate = addDays(date, 1);
                break;
            case ' ':
            case 'Enter':
                event.preventDefault();
                handleDateClick(date);
                return;
        }
        setFocusedDate(newDate);
        if (!isSameMonth(newDate, currentDate)) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentDate(startOfMonth(newDate));
                setIsTransitioning(false);
            }, 300);
        }
    };

    const handleTodayClick = () => {
        setCurrentDate(new Date());
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
            <div className={styles.header} role="group" aria-label="Calendar navigation">
                <div
                    className={styles['chevron-wrapper']}
                    onClick={handlePrevYear}
                    onKeyDown={(event) => handleChevronKeyDown(event, handlePrevYear)}
                    tabIndex={0}
                    role="button"
                    aria-label="Previous year"
                >
                    <i className={`fas fa-angle-double-left ${styles.chevron}`}></i>
                </div>
                <div
                    className={styles['chevron-wrapper']}
                    onClick={handlePrevMonth}
                    onKeyDown={(event) => handleChevronKeyDown(event, handlePrevMonth)}
                    tabIndex={0}
                    role="button"
                    aria-label="Previous month"
                >
                    <i className={`fas fa-chevron-left ${styles.chevron}`}></i>
                </div>
                <div className={styles['current-date']} aria-live="polite">
                    {`${getDayWithSuffix(day)} ${month}`}
                </div>
                <div
                    className={styles['chevron-wrapper']}
                    onClick={handleNextMonth}
                    onKeyDown={(event) => handleChevronKeyDown(event, handleNextMonth)}
                    tabIndex={0}
                    role="button"
                    aria-label="Next month"
                >
                    <i className={`fas fa-chevron-right ${styles.chevron}`}></i>
                </div>
                <div
                    className={styles['chevron-wrapper']}
                    onClick={handleNextYear}
                    onKeyDown={(event) => handleChevronKeyDown(event, handleNextYear)}
                    tabIndex={0}
                    role="button"
                    aria-label="Next year"
                >
                    <i className={`fas fa-angle-double-right ${styles.chevron}`}></i>
                </div>
            </div>
        );
    };

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return (
            <div className={styles['days-of-week']} role="row">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className={styles['day-of-week']} role="columnheader">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderDays = () => {
        const startDate = startOfWeek(startOfMonth(currentDate));
        const endDate = addDays(startDate, 6 * 7 - 1); // Always show 6 weeks
        const days = eachDayOfInterval({ start: startDate, end: endDate });

        return (
            <div className={`${styles.days} ${isTransitioning ? styles.fade : ''}`} role="grid">
                {days.map((day: Date, index: number) => (
                    <div
                        key={index}
                        ref={focusedDate && isSameDay(day, focusedDate) ? focusedDateRef : null}
                        className={`
                        ${styles.day}
                        ${!isSameMonth(day, currentDate) ? styles['outside-month'] : ''}
                        ${isToday(day) ? styles.today : ''}
                        ${selectedDate && isSameDay(day, selectedDate) ? styles.selected : ''}
                    `}
                        onClick={() => handleDateClick(day)}
                        onKeyDown={(event) => handleKeyDown(event, day)}
                        tabIndex={0}
                        role="gridcell"
                        aria-selected={selectedDate ? isSameDay(day, selectedDate) : false}
                        aria-label={format(day, 'EEEE, MMMM d, yyyy')}
                    >
                        {format(day, 'd')}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={styles['date-picker']} role="application" aria-label="Date Picker">
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderDays()}
            <hr />
            <Button onClick={handleTodayClick} iconName="fas fa-calendar-day" size="tiny">
                Today
            </Button>
        </div>
    );
};

export default DatePicker;