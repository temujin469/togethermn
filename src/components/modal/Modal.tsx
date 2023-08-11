import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, ButtonProps } from '../ui/button';
import { Backdrop, Breakpoint, CircularProgress } from '@mui/material';

type Props = {
  open: boolean
  title?: string;
  description?: string
  trigger?: React.ReactNode
  fullWidth?: boolean
  fullScreen?:boolean
  maxWidth?: false | Breakpoint
  children?: React.ReactNode
  closeBtnTitle?: string;
  submitBtnProps?: ButtonProps
  submitBtnTitle?: string;
  onSubmit?: () => void
  onClose?: () => void
  isLoading?: boolean;
  footerAction?: React.ReactNode
}

export default function Modal({ fullWidth = true, maxWidth = "sm", ...props }: Props) {
  return (
    <div>
     
      {props.trigger}
      <Dialog
        open={props.open}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        onClose={props.onClose}
        fullScreen={props.fullScreen}
      >
        {
          props.title && (
            <DialogTitle>
              {props.title}
            </DialogTitle>
          )
        }
        <DialogContent 
        sx={{
          paddingX:"15px",
          // md:{
          //   paddingX:"30px",
          // },
        }}
        >
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
            open={props.isLoading === true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {
            props.description && (
              <DialogContentText>
                {props.description}
              </DialogContentText>
            )
          }
          {props.children}
        </DialogContent>
        <DialogActions>
          {props.footerAction ? props.footerAction : (
            <>
              <Button onClick={props.onClose}>
                {props.closeBtnTitle ? props.closeBtnTitle : "Үгүй"}
              </Button>
              <Button variant="secondary" {...props.submitBtnProps} onClick={props.onSubmit} autoFocus>
                {
                  // props.isLoading ? "Loading..." : (
                    props.submitBtnTitle ? props.submitBtnTitle : "Тийм"
                  // )
                }
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
