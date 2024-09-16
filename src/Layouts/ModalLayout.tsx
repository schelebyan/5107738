import React, { ReactNode } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import theme, { appColors } from "../theme";

interface IProps extends DialogProps {
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const ModalLayout: React.FC<IProps> = (props) => {
  const { onClose, children, title } = props;

  return (
    <Dialog
      {...props}
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          borderRadius: 16,
          minHeight: 400,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 110,
          minHeight: 110,
          backgroundColor: appColors.barBackground,
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            color: theme.palette.common.white,
            textAlign: "center",
            fontWeight: 500,
            fontSize: 36,
            width: "100%",
            padding: 0,
          }}
        >
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            color: (theme) => theme.palette.common.white,
          }}
        >
          <CloseIcon sx={{ fontSize: 42 }} />
        </IconButton>
      </Box>

      <DialogContent sx={{ backgroundColor: appColors.background }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalLayout;
