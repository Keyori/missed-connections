import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

export default function DateTimePickerCustom({ onSelectDateTime }) {

  const [dateTime, setDateTime] = useState(dayjs());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(true);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');

    if (event.type === "dismissed") return onSelectDateTime(undefined);


    setDateTime(old => {
      if (mode === 'date') return dayjs(selectedDate);

      return old.hour(selectedDate.getHours()).minute(selectedDate.getMinutes())
    })

    if (mode === 'date') {
      setMode('time');
      setShow(true)
    }

  };

  useEffect(() => {
    if (mode === 'time') onSelectDateTime(dateTime)
    return () => {
      setDateTime(old => mode === 'time' ? {} : old);
      setMode(old => mode === 'time' ? "" : old);
    };
  }, [dateTime])

  return (
    <>
      {
        show &&
        <DateTimePicker
          value={dateTime.toDate()}
          mode={mode}
          onChange={onChange}
        />
      }
    </>


  )
}
