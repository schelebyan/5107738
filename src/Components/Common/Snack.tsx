import React from "react";
import { Alert, Snackbar, SnackbarProps } from "@mui/material";
import { MessageType } from "../../models/common";

interface IProps {
  type: MessageType;
}

const Snack: React.FC<SnackbarProps & IProps> = ({
  type = MessageType.Info,
  children,
  ...props
}) => {
  return (
    <Snackbar
      autoHideDuration={1000}
      {...props}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert elevation={6} variant="filled" severity={type}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
