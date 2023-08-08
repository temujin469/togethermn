"use client"
import React from 'react';
import Container from '../ui/container';
import { Tabs } from '@mui/material';
import { CustomTabPanel, StyledTab } from '../ui/customTab';
import { useUser } from '@/hooks/useUser';
import FeaturedTalent from './FeaturedTalent';


const BestRated: React.FC = () => {
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

  // const md = useMediaQuery("(min-width:640px)")

  return (
    <Container>
      <div className='my-20 xl:container mx-auto'>
        <div className='border-b'>
          <Tabs scrollButtons allowScrollButtonsMobile variant={"standard"} value={value} onChange={handleChange} aria-label="basic tabs example" className=' max-w-[1000px] mx-auto'>
            {/* display these if user type is talent */}
            <StyledTab label="Мэргэжилтнүүд " {...a11yProps(0)} />
          </Tabs>
        </div>

        {/* display these if user type is talent  */}
        <CustomTabPanel value={value} index={0}>
          <FeaturedTalent />
        </CustomTabPanel>
      </div>
    </Container>
  )
}

export default BestRated;
