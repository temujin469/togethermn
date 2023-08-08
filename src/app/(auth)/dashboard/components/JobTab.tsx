"use client"
import { Tabs, useMediaQuery } from '@mui/material';
import React from 'react';
import Jobs from './tabItems/openJobs/Jobs';
import ClosedJobs from './tabItems/closedJobs/ClosedJobs';
import { CustomTabPanel, StyledTab } from '@/components/ui/customTab';
import { useUser } from '@/hooks/useUser';
import BookedTalent from './tabItems/bookedTalent/BookedTalent';
import InvitedTalent from './tabItems/invitedTalent/invitedTalent';


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
            <Tabs scrollButtons allowScrollButtonsMobile variant={md ? "standard" : "scrollable"} value={value} onChange={handleChange} className=' max-w-[1000px] md:px-4 mx-auto'>
              <StyledTab label="Нээлттэй ажил"  {...a11yProps(0)} />
              <StyledTab label="Урилга" {...a11yProps(1)} />
              <StyledTab label="Захиалагдсан ажил" {...a11yProps(2)} />
            </Tabs>
      </div>

      <CustomTabPanel value={value} index={0}>
        <Jobs />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <InvitedTalent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <BookedTalent />
      </CustomTabPanel>

    </div>
  );
}

export default JobTab;
