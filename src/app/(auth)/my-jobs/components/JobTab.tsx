"use client"
import { Tabs, useMediaQuery } from '@mui/material';
import React from 'react';
import Jobs from './tabItems/openJobs/Jobs';
import ClosedJobs from './tabItems/closedJobs/ClosedJobs';
import { CustomTabPanel, StyledTab } from '@/components/ui/customTab';
import AppliedJobs from './tabItems/appliedJobs/AppliedJobs';
import BookedJobs from './tabItems/bookedJobs/BookedJobs';
import InvitedJobs from './tabItems/invitedJobs/InvitedJobs';
import { useUser } from '@/hooks/useUser';


function JobTab() {
  const [value, setValue] = React.useState(0);
  const { user } = useUser()

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

  console.log(user)


  return (
    <div>
      <div className='bg-white shadow'>
        <Tabs scrollButtons allowScrollButtonsMobile variant={md ? "standard" : "scrollable"} value={value} onChange={handleChange} aria-label="basic tabs example" className=' max-w-[1000px] md:px-4 mx-auto'>
          <StyledTab label="Нээлттэй ажил"  {...a11yProps(0)} />
          <StyledTab label="Хаагдсан ажил" {...a11yProps(1)} />
          {/* display these if user type is talent */}
          {
            user?.profileType === "talent" && (
              <>
                <StyledTab label="Уригдсан ажил" {...a11yProps(2)} />
                <StyledTab label="Хүсэлт илгээсэн ажил" {...a11yProps(3)} />
                <StyledTab label="Захиалсан ажил" {...a11yProps(4)} />
              </>
            )
          }

        </Tabs>
      </div>
      <CustomTabPanel value={value} index={0}>
        <Jobs />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ClosedJobs />
      </CustomTabPanel>
      {/* display these if user type is talent  */}
      {
        user?.profileType === "talent" && (
          <>
            <CustomTabPanel value={value} index={2}>
              <InvitedJobs />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <AppliedJobs />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
              <BookedJobs/>
            </CustomTabPanel>
          </>
        )
      }

    </div>
  );
}

export default JobTab;
