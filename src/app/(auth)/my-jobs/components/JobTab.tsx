"use client"
import { Tabs, useMediaQuery } from '@mui/material';
import React from 'react';
import Jobs from './Jobs';
import ClosedJobs from './ClosedJobs';
import { CustomTabPanel, StyledTab } from '@/components/ui/customTab';


function JobTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const md = useMediaQuery("(min-width:640px)")


  return (
    <div>
      <div className='bg-white shadow'>
        <Tabs variant={md ? "standard" : "fullWidth"} value={value}  onChange={handleChange} aria-label="basic tabs example" className=' max-w-[1000px] md:px-4 mx-auto'>
          <StyledTab label="Нээлттэй ажил"  {...a11yProps(0)} />
          <StyledTab label="Хаагдсан ажил" {...a11yProps(1)} />
        </Tabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <Jobs/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ClosedJobs/>
      </CustomTabPanel>
    </div>
  );
}

export default JobTab;
