import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

interface InfoDialogProps {
  open: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
  buttonText?: string;
}

function InfoDialog({
  open,
  title,
  message,
  type = 'info',
  onClose,
  buttonText = 'Aceptar',
}: InfoDialogProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main' }} />;
      case 'error':
        return <ErrorIcon sx={{ fontSize: 60, color: 'error.main' }} />;
      case 'warning':
        return <WarningIcon sx={{ fontSize: 60, color: 'warning.main' }} />;
      default:
        return <InfoIcon sx={{ fontSize: 60, color: 'info.main' }} />;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="info-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <Box sx={{ textAlign: 'center', pt: 3 }}>
        {getIcon()}
      </Box>
      <DialogTitle id="info-dialog-title" sx={{ textAlign: 'center' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: 'center' }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button onClick={onClose} variant="contained" color={getColor()} size="large">
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InfoDialog;