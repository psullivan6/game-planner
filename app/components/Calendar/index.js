import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const Calendar = props => {
  const [date, changeDate] = useState(new Date());

  const handleChange = dateChange => {
    changeDate(dateChange);
    props.onChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        autoOk
        orientation="landscape"
        variant="static"
        openTo="date"
        value={date}
        onChange={handleChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default Calendar;
