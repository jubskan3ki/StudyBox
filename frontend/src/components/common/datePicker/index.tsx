import './style.css';
import type { DatePickerProps } from '~/types/components/common/datePicker.interface';

function DatePicker({ startDate, endDate, onStartDateChange, onEndDateChange }: DatePickerProps) {
    return (
        <div className="date-picker">
            <div className="date-picker-container">
                <label htmlFor="start-date">Date de début</label>
                <div>
                    <input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        className="date-input"
                        required
                    />
                </div>
            </div>
            <div className="date-picker-container">
                <label htmlFor="end-date">Date de fin</label>
                <div>
                    <input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        className="date-input"
                        required
                    />
                </div>
            </div>
        </div>
    );
}

export default DatePicker;
