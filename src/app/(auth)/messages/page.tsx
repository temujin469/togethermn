"use client"
import  React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';
import { StyledTab } from '@/components/ui/customTab';
import AllMessages from './components/tabs/AllMessages';
import RecievedMessages from './components/tabs/RecievedMessages';
import SendMessages from './components/tabs/SendMessages';
import SubHeader from '@/components/header/SubHeader';
import TabPanel from './components/TabPanel';
import SendMessageModal from '@/components/modal/messages/SendMessageModal';





export default function Messages() {
  const [value, setValue] = useState(0);
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.up("md"));
  
  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='flex-[1] h-full'>
      <SubHeader left={
        <SendMessageModal/>
      }/>
      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: { sx: "block", md: "flex" }, height: "100%", width: "100%" }}
      >
        <Tabs
        className='shadow md:sticky top-0 md:h-[calc(100vh-75px)]'
          orientation={!md ? "horizontal" : "vertical" }
          variant={md ? "standard" : "scrollable"}
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <StyledTab label="Бүх зурвас" {...a11yProps(0)} />
          <StyledTab label="Надад ирсэн зурвас" {...a11yProps(1)} />
          <StyledTab label="Илгээсэн зурвас" {...a11yProps(2)} />
        </Tabs>
        <div className='flex-[1]'>
          <TabPanel value={value} index={0}>
            <AllMessages />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <RecievedMessages />
          </TabPanel >
          <TabPanel value={value} index={2}>
            <SendMessages />
          </TabPanel >
        </div>
      </Box>
    </div>

  );
}