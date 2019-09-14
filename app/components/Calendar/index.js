import React, { useEffect, useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Calendar = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartChange = dateChange => {
    setStartDate(dateChange);
    // props.onChange(date);
  };

  const handleEndChange = dateChange => {
    setEndDate(dateChange);
    // props.onChange(date);
  };

  useEffect(() => {
    console.log('WUZ A CHANGE\n', startDate, '\n', endDate);
  }, [startDate, endDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk={true}
        format="eee, MMM dd"
        label="Start Date"
        inputVariant="outlined"
        value={startDate}
        onChange={handleStartChange}
      />
      <DatePicker
        autoOk={true}
        format="eee, MMM dd"
        label="End Date"
        inputVariant="outlined"
        value={endDate}
        onChange={handleEndChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Calendar;
