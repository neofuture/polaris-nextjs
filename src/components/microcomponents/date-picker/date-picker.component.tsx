"use client";

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
    appointments?: Date[];
}

const DatePicker: React.FC<DatePickerProps> = ({ selected, onChange, appointments = [] }) => {
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
        if (selectedDate && isSameDay(date, selectedDate)) {
            return;
        }
        setSelectedDate(date);
        setCurrentDate(date);
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

    const handleTodayClick = () => {
        const today = new Date();
        if (today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear()) {
            setFocusedDate(today);
            setCurrentDate(today);
        } else {
            setIsTransitioning(true);
            setTimeout(() => {
                setFocusedDate(today);
                setCurrentDate(today);
                setIsTransitioning(false);
            }, 300);
        }
    };

    const handleSelectedDateClick = () => {
        if (selectedDate) {
            if (selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear()) {
                setFocusedDate(selectedDate);
                setCurrentDate(selectedDate);
            } else {
                setIsTransitioning(true);
                setTimeout(() => {
                    setFocusedDate(selectedDate);
                    setCurrentDate(selectedDate);
                    setIsTransitioning(false);
                }, 300);
            }
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
                {days.map((day: Date, index: number) => {
                    const hasAppointment = appointments.some((appointment: Date) => isSameDay(day, appointment));
                    const dayClassNames = [
                        styles.day,
                        !isSameMonth(day, currentDate) && styles['outside-month'],
                        isToday(day) && styles.today,
                        selectedDate && isSameDay(day, selectedDate) && styles.selected,
                        hasAppointment && styles.appointment
                    ].filter(Boolean).join(' ');

                    return (
                        <div
                            key={index}
                            ref={focusedDate && isSameDay(day, focusedDate) ? focusedDateRef : null}
                            className={dayClassNames}
                            onClick={() => handleDateClick(day)}
                            onKeyDown={(event) => handleKeyDown(event, day)}
                            tabIndex={0}
                            role="gridcell"
                            aria-selected={selectedDate ? isSameDay(day, selectedDate) : false}
                            aria-label={format(day, 'EEEE, MMMM d, yyyy')}
                        >
                            {format(day, 'd')}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={styles['date-picker']} role="application" aria-label="Date Picker">
            {renderHeader()}
            {renderDaysOfWeek()}
            {renderDays()}
            <hr/>
            <div className={styles['button-container']}>
                <Button onClick={handleTodayClick} iconName="fas fa-calendar-day" size="small" state="secondary">
                    Today
                </Button>
                <Button onClick={handleSelectedDateClick} iconName="fas fa-calendar-check" size="small" state='primary'>
                    Selected Date
                </Button>
            </div>
        </div>
    );
};

export default DatePicker;