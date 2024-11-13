import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface IMDatePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange: (startDate: Date, endDate: Date) => void;
}

const MDatePicker: React.FC<IMDatePickerProps> = ({
  startDate = new Date(),
  endDate = new Date(),
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const adjustStartAndEndDate = (currentDate: Date) => {
    const start = new Date(currentDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(currentDate);
    end.setHours(23, 59, 59, 999);

    return { start, end };
  };

  const { start, end } = adjustStartAndEndDate(new Date());

  const [startDateState, setStartDateState] = useState<Date>(
    startDate || start
  );
  const [endDateState, setEndDateState] = useState<Date>(endDate || end);

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDateState(date);
      onChange(date, endDateState!);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setEndDateState(date);
      onChange(startDateState!, date);
    }
  };

  const handleToggleDatepicker = () => {};

  const formattedStartDate = format(startDateState, "dd MMMM");
  const formattedEndDate = format(endDateState, "dd MMMM");

  return (
    <div className="m-datepicker-normal">
      <div
        className="date-range"
        onClick={() => {
          handleToggleDatepicker();
          setIsOpen(!isOpen);
        }}
      >
        <strong>{formattedStartDate} </strong>
        to
        <strong> {formattedEndDate}</strong>
      </div>

      {isOpen && (
        <div className="datepicker-container">
          <DatePicker
            selected={startDateState}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDateState}
            endDate={endDateState}
            dateFormat="dd MMMM"
            inline
          />
          <DatePicker
            selected={endDateState}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDateState}
            endDate={endDateState}
            minDate={startDateState}
            dateFormat="dd MMMM"
            inline
          />
        </div>
      )}
    </div>
  );
};

export default MDatePicker;
