import React, { useEffect, useState } from 'react'
import TabPanel from '@mui/lab/TabPanel'
import DatePicker from '../DatePicker'
import records from '../../API/data.json'
import classes from './BonusTask.module.css'
import Chart from 'react-apexcharts'

function BonusTask () {
  const [startDate, setStartDate] = useState(new Date('2022-01-08T21:11:54'))
  const [endDate, setEndDate] = useState(new Date('2022-01-09T21:11:54'))
  const [filteredDates, setFilteredDates] = useState()
  const [pieData, setPieData] = useState()
  const [pieCategory, setPieCategory] = useState()

  useEffect(() => {
    console.log(records)
    if (startDate && endDate) {
      const filteredRec = records.filter(rec => {
        return (
          new Date(rec.item_date).setHours(0, 0, 0, 0) >=
            new Date(startDate).setHours(0, 0, 0, 0) &&
          new Date(rec.item_date).setHours(0, 0, 0, 0) <=
            new Date(endDate).setHours(0, 0, 0, 0)
        )
      })
      setFilteredDates(filteredRec)
      const priorCount = {}
      filteredRec.map(rec => {
        const date1 = new Date(rec.item_date)
        const date2 = new Date(rec.schedule_time)
        const diffTime = Math.abs(date2 - date1)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        priorCount[diffDays] = priorCount[diffDays]
          ? priorCount[diffDays] + 1
          : 1
      })
      const pData = Object.keys(priorCount).map(key => {
        return priorCount[key]
      })
      console.log(priorCount, filteredRec.length, pData)
      setPieCategory(Object.keys(priorCount))
      setPieData(pData)
    }
  }, [startDate, endDate])

  return (
    <TabPanel value='2'>
      <h4 style={{ marginBottom: '1.5rem' }}>
        Pick a date for data visualization
      </h4>

      <div className={classes.dates}>
        <DatePicker
          label={'Start Date'}
          selectedDate={startDate}
          setSelectedDate={setStartDate}
        />
        <DatePicker
          label={'End Date'}
          selectedDate={endDate}
          setSelectedDate={setEndDate}
        />
      </div>

      <div className='chart'>
        <p style={{marginBottom: '1rem'}}>Scheduled date prior to Item Date (Days)</p>
        <Chart
          type='pie'
          height={600}
          width={600}
          series={pieData}
          options={{
            labels: pieCategory
          }}
        />
      </div>
    </TabPanel>
  )
}

export default BonusTask
