import React, { ReactNode } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Box, IconButton, SxProps, Theme, Typography } from "@mui/material";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
  rightComponent?: ReactNode;
  hideBackButton?: boolean;
  sx?: SxProps<Theme>;
}

const Headline: React.FC<IProps> = ({
  title,
  hideBackButton = false,
  rightComponent = null,
  sx = {},
}) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={sx}
      display="flex"
      justifyContent="space-between"
      alignItems={{
        xs: "flex-start",
        sm: "center",
        md: "center",
        lg: "center",
        xl: "center",
      }}
      flexDirection={{
        xs: "column",
        sm: "row",
        md: "row",
        lg: "row",
        xl: "row",
      }}
      mb={2}
    >
      <Box display="flex" alignItems="center">
        {!hideBackButton && (
          <IconButton
            aria-label="back"
            size="large"
            onClick={() => navigate(-1)}
          >
            <KeyboardBackspaceIcon fontSize="inherit" />
          </IconButton>
        )}
        <Typography
          sx={{
            color: theme.palette.common.black,
            fontWeight: 500,
            position: "relative",
          }}
          variant="h5"
        >
          {title}
        </Typography>
      </Box>
      <Box
        width={{
          xs: "100%",
          sm: "inherit",
          md: "inherit",
          lg: "inherit",
          xl: "inherit",
        }}
      >
        {rightComponent}
      </Box>
    </Box>
  );
};

export default Headline;
