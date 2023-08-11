"use client"
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { AlignJustifyIcon } from 'lucide-react';
import SubHeader from '@/components/header/SubHeader';

function SideMenu({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 260;


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  return (
    <div>
      <div >
        <SubHeader
          left={
            <div className='md:hidden'>
              <AlignJustifyIcon onClick={handleDrawerToggle} />
            </div>
          }
        />
      </div>

      
      <Box sx={{ display: 'flex' }}>
        <Drawer
          open={mobileOpen}
          variant="temporary"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-root': {
              position: 'absolute'
            },
            '& .MuiPaper-root': {
              position: 'absolute'
            },
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {/* <DrawerMenu /> */}
        </Drawer>
       
        <div className='flex-[1] bg-gray-50/50 min-h-[calc(100vh-115px)] md:h-[calc(100vh-115px)] overflow-hidden relative'>
          {children}
        </div>
      </Box>
    </div>
  );
}

export default SideMenu;
