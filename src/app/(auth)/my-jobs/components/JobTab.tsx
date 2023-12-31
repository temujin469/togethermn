"use client"
import { Tabs, useMediaQuery } from '@mui/material';
import React from 'react';
import { CustomTabPanel, StyledTab } from '@/components/ui/customTab';
import AppliedJobs from './tabItems/appliedJobs/AppliedJobs';
import BookedJobs from './tabItems/bookedJobs/BookedJobs';
import InvitedJobs from './tabItems/invitedJobs/InvitedJobs';

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
            <Tabs scrollButtons allowScrollButtonsMobile variant={md ? "standard" : "scrollable"} value={value} onChange={handleChange} aria-label="basic tabs example" className=' max-w-[1000px] md:px-4 mx-auto'>
              {/* display these if user type is talent */}
              <StyledTab label="Уригдсан ажил" {...a11yProps(0)} />
              <StyledTab label="Өргөдөл илгээсэн ажил" {...a11yProps(1)} />
              <StyledTab label="Захиалсан ажил" {...a11yProps(2)} />
            </Tabs>
      </div>

      {/* display these if user type is talent  */}
            <CustomTabPanel value={value} index={0}>
              <InvitedJobs />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <AppliedJobs />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <BookedJobs />
            </CustomTabPanel>
    </div>
  );
}

export default JobTab;
