import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import theme, { appColors } from "../../theme";

interface IProps extends CircularProgressProps {
  label: ReactNode;
  progress: number;
}

const CircularProgressWithLabel: React.FC<IProps> = (props) => {
  const { label, progress, size } = props;
  return (
    <Box
      sx={{
        position: "relative",
        verticalAlign: "middle",
        justifyContent: "center",
        width: size,
        margin: "0 auto",
      }}
    >
      <CircularProgress
        variant="determinate"
        sx={{
          color: appColors.timerBackground,
          position: "absolute",
        }}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        value={progress}
        sx={{
          color: theme.palette.common.white,
          scale: "1 1",
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        {...props}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {label}
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
