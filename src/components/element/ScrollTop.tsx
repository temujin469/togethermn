"use client"
import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import { ArrowUp } from "lucide-react";


function ScrollTop() {
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    // target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 200,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }

    window.scrollTo({behavior:"smooth",top:0})
  };

  return (
    <div className="hidden md:block">
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <Fab size="small" className="bg-white" aria-label="scroll back to top">
          <ArrowUp className="text-gray-600"/>
        </Fab>
      </Box>
    </Fade>
    </div>
  );
}

export default ScrollTop;