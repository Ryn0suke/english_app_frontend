import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertProps } from '@mui/material/Alert';


interface AlertMessageProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  severity: 'error' | 'success' | 'info' | 'warning';
  message: string;
}

// アラートメッセージ（何かアクションを行なった際の案内用に使い回す）
const AlertMessage: React.FC<AlertMessageProps> = ({ open, setOpen, severity, message }) => {
    const handleCloseAlertMessage = (event: React.SyntheticEvent<any> | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleCloseAlertMessage}
      >
        <Alert onClose={handleCloseAlertMessage} severity={severity} variant="filled" elevation={6}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertMessage;
