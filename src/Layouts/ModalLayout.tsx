import React, { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IProps extends DialogProps {
  onClose: () => void;
  confirmationButton: ReactNode;
  children: ReactNode;
  title: string;
}

const ModalLayout: React.FC<IProps> = (props) => {
  const { onClose, confirmationButton, children, title } = props;

  return (
    <Dialog {...props}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        {confirmationButton}
      </DialogActions>
    </Dialog>
  );
};

export default ModalLayout;
