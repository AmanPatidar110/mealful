import React, { useEffect, useRef, useState } from 'react';
import records from '../../API/data.json'
import DatePicker from '../DatePicker/DatePicker';
import Chart from 'react-apexcharts'

import TabPanel from '@mui/lab/TabPanel'


function Task () {

    
  const [category, setCategory] = useState([])
  const [data, setData] = useState([])
  const [pieData, setPieData] = useState()

  const [selectedDate, setSelectedDate] = useState(
    new Date('2022-01-08T21:11:54')
  )
  const [scheduledDate, setScheduledDate] = useState()
  const [filteredDates, setFilteredDates] = useState()

  const divRef = useRef();
  
  
  useEffect(() => {
    if (scheduledDate) {
      const scheduledDateItems = filteredDates.filter(
        date => date.schedule_time.split(' ')[0] === scheduledDate
      )
      console.log(scheduledDateItems)
      const hoursArray = scheduledDateItems.map(item =>
        new Date(item.schedule_time).getHours()
      )
      console.log(hoursArray)
      const pData = [0, 0, 0, 0, 0, 0, 0, 0]
      console.log(pData)

      hoursArray.forEach(h => {
        const index = Math.floor(h / 3)
        console.log(index)
        pData[index] = pData[index] + 1
      })

      setPieData(pData)
     
    }
  }, [scheduledDate])

  useEffect(() => {
    if(divRef.current && pieData)
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [pieData])

  useEffect(() => {
    console.log(records)
    const filteredRec = records.filter(rec => {
      return (
        new Date(rec.item_date).toLocaleDateString() ===
        new Date(selectedDate).toLocaleDateString()
      )
    })
    setFilteredDates(filteredRec)
    console.log(filteredRec)
    const itemDates = filteredRec.map(rec => rec.schedule_time.split(' ')[0])
    const cat = new Set(itemDates)
    const dataArray = []
    setCategory([...cat.keys()])
    ;[...cat.keys()].forEach((cat, index) => {
      dataArray[index] = filteredRec.filter(
        rec =>
          new Date(rec.schedule_time.split(' ')[0]).toLocaleDateString() ===
          new Date(cat).toLocaleDateString()
      ).length
    })

    setData(dataArray)
    console.log(dataArray)
  }, [selectedDate])


  return (
    <TabPanel value='1'>
      <h4 style={{marginBottom :'1.5rem'}}>Pick a date for data visualization</h4>
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className='chart'>
        <h4>
          {' '}
          Scheduling Dates for Item Date: {selectedDate.toLocaleDateString()}{' '}
        </h4>
        <p style={{ color: 'grey' }}>
          Click on any bar to see the hour wise breakup of Scheduling Time of
          that particular date
        </p>
        <Chart
          options={{
            chart: {
              id: 'apexchart-example',
              events: {
                click: function (event, chartContext, config) {
                  console.log(
                    config.config.xaxis.categories,
                    config.config.xaxis.categories[config.dataPointIndex]
                  )
                  setScheduledDate(
                    config.config.xaxis.categories[config.dataPointIndex]
                  )
                }
              }
            },
            xaxis: {
              categories: category
            }
          }}
          series={[
            {
              name: 'series-1',
              data: data
            }
          ]}
          type='bar'
          width={800}
          height={500}
        />
      </div>
      {pieData && (
        <>
          <h4>
            Hourly breakup for Item Date: {selectedDate.toLocaleDateString()} &
            Scheduled Date: {scheduledDate}{' '}
          </h4>
          <div style={{ display: 'flex' }} ref={divRef}  >
            <div className='chart'>
              <Chart
                options={{
                  chart: {
                    id: 'apexchart-example'
                  },
                  xaxis: {
                    categories: [
                      '0 - 3',
                      '3 - 6',
                      '6 - 9',
                      '9-12',
                      '12-15',
                      '15-18',
                      '18-21',
                      '21-24'
                    ]
                  }
                }}
                series={[
                  {
                    name: 'series-1',
                    data: pieData
                  }
                ]}
                type='bar'
                width={500}
                height={250}
              />
            </div>

            <div className='chart'>
              <Chart
                type='pie'
                height={400}
                width={400}
                series={pieData}
                options={{
                  labels: [
                    '0 - 3',
                    '3 - 6',
                    '6 - 9',
                    '9-12',
                    '12-15',
                    '15-18',
                    '18-21',
                    '21-24'
                  ]
                }}
              />
            </div>
          </div>
        </>
      )}
    </TabPanel>
  )
}

export default Task
