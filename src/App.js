import React, { useState } from 'react'
import './App.css'


import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import Task from './Components/Task/Task'
import BonusTask from './Components/BonusTask/BonusTask'

function App () {
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className='App'>
      <Box
        sx={{
          bgcolor: 'background.paper',
          width: '100%'
        }}
      >
        <TabContext value={value}>
          <Box >
            <TabList
              centered
              style={{ boxShadow: '1px 1px 20px 1px rgba(0, 0,0, 0.15)', width: '50%', margin: 'auto' }}
              onChange={handleChange}
              aria-label='lab API tabs example'
            >
              <Tab label='Task' value='1' />
              <Tab label='Bonus Task' value='2' />
            </TabList>
          </Box>
          <Task />
         <BonusTask />
        </TabContext>
      </Box>
    </div>
  )
}

export default App
