"use client"
import { Tabs, useMediaQuery } from '@mui/material';
import React from 'react';
import ReviewsIReceived from './ReviewsIReceived';
import { CustomTabPanel, StyledTab } from '@/components/ui/customTab';
import ReviewsIGave from './ReviewsIGave';
import { useUser } from '@/hooks/useUser';




function ReviewsTab() {
  const [value, setValue] = React.useState(0);
  const { user, isLoading } = useUser()

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
        <Tabs variant={md ? "standard" : "fullWidth"} value={value} onChange={handleChange} aria-label="basic tabs example" className=' max-w-[1000px] md:px-4 mx-auto'>
          {
            user?.profileType === "employer" ? (
              <StyledTab label="Миний өгсөн сэтгэгдэл"  {...a11yProps(0)} />

            ) : user?.profileType === "talent" ? (
                <StyledTab label="Надад ирсэн сэтгэгдэл" {...a11yProps(0)} />

            ) : null
          }
        </Tabs>
      </div>
      {
        user?.profileType === "employer" ? (
          <CustomTabPanel value={value} index={0}>
            <ReviewsIGave />
          </CustomTabPanel>
        ) : user?.profileType === "talent" ? (
            <CustomTabPanel value={value} index={0}>
              <ReviewsIReceived />

            </CustomTabPanel>
        ) : null
      }
     
      
    </div>
  );
}

export default ReviewsTab;
