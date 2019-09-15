import React, { useEffect, useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { addDays, isAfter, isWithinInterval, parseISO, subDays } from 'date-fns'

// Context
import { useGames } from '../../services/GamesService/context';

const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { onFilterChange } = useGames();

  const handleStartChange = newStartDate => {
    setStartDate(newStartDate);

    if (!isAfter(endDate, newStartDate)) {
      setEndDate(addDays(newStartDate, 1));
    }
  };

  const handleEndChange = newEndDate => {
    setEndDate(newEndDate);

    if (!isAfter(newEndDate, startDate)) {
      setStartDate(subDays(newEndDate, 1));
    }
  };

  useEffect(() => {
    onFilterChange((game) => (
      isWithinInterval(parseISO(game.fields.date), {
        start: startDate,
        end: endDate
      })
    ))
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
