import React from 'react'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import TextField from '@mui/material/TextField'
import MobileDatePicker from '@mui/lab/MobileDatePicker'

function DatePicker ({ selectedDate, setSelectedDate, label }) {
  const handleChange = newValue => {
    setSelectedDate(newValue)
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label={label || 'Date'}
          inputFormat='yyyy/MM/dd'
          value={selectedDate}
          onChange={handleChange}
          renderInput={params => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  )
}

export default DatePicker
