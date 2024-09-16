import React, { useEffect, useState } from "react";
import ModalLayout from "../../Layouts/ModalLayout";
import { Duration } from "luxon";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import CircularProgressWithLabel from "../../Components/Common/CircularProgressWithLabel";
import theme, { appColors } from "../../theme";

const TimeInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    position: "relative",
    color: theme.palette.common.white,
    fontSize: 56,
    backgroundColor: "transparent",
    border: "none",
    borderColor: "none",
  },
}));

const Timer: React.FC = () => {
  const navigate = useNavigate();
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [isTimeActive, setIsTimerActive] = useState<boolean>(false);
  const [timerStateWhileUpdating, setTimerStateWhileUpdating] =
    useState<boolean>(false);

  useEffect(() => {
    if (!isTimeActive) {
      return;
    }
    let intervalId: number | undefined = setInterval(() => {
      setCurrentSeconds((prev) => {
        if (prev >= 1) {
          const secondsRemaining = prev - 1;
          const percent = Math.ceil((secondsRemaining / totalSeconds) * 100);
          setPercentage(percent);

          if (secondsRemaining <= 0) {
            clearInterval(intervalId);
            intervalId = undefined;
            onComplete();
            handleReset();
          }

          return secondsRemaining;
        }
        return 0;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      intervalId = undefined;
    };
  }, [isTimeActive, totalSeconds]);

  const onComplete = () => {
    console.log("timer done");
  };

  const handleFocus = () => {
    setTimerStateWhileUpdating(isTimeActive);
    setIsTimerActive(false);
  };
  const handleBlur = () => {
    if (currentSeconds <= 0) {
      onComplete();
      handleReset();
    } else {
      setIsTimerActive(timerStateWhileUpdating);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const isNum = !isNaN(value);
    if (isNum && value <= 59) {
      const seconds = currentSeconds - Math.floor(currentSeconds / 60) * 60;
      const minutes = Math.floor(currentSeconds / 60);
      if (e.target.name === "minutes") {
        setTotalSeconds(value * 60 + seconds);
        setCurrentSeconds(value * 60 + seconds);
      } else if (e.target.name === "seconds") {
        setTotalSeconds(minutes * 60 + value);
        setCurrentSeconds(minutes * 60 + value);
      }
    }
  };

  const toggleTimerActive = () => {
    setIsTimerActive(!isTimeActive);
  };

  const handleAddMinute = () => {
    const minutes = Math.floor(totalSeconds / 60);
    if (minutes + 1 <= 59) {
      setTotalSeconds(totalSeconds + 60);
      setCurrentSeconds(currentSeconds + 60);
    }
  };
  const handleReset = () => {
    setTotalSeconds(0);
    setCurrentSeconds(0);
    setPercentage(0);
    setTimerStateWhileUpdating(false);
    setIsTimerActive(false);
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <ModalLayout
      title="Timer"
      onClose={handleClose}
      open
      fullWidth
      maxWidth="xs"
    >
      <Box my={14}>
        <CircularProgressWithLabel
          size={300}
          thickness={2.5}
          progress={percentage}
          label={
            <>
              <TimeInput
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                name="minutes"
                inputProps={{
                  style: {
                    textAlign: "right",
                  },
                }}
                value={Duration.fromObject({
                  minutes: Math.floor(currentSeconds / 60),
                }).toFormat("mm")}
              />
              <Typography
                sx={{
                  color: theme.palette.common.white,
                  fontSize: 56,
                }}
              >
                :
              </Typography>
              <TimeInput
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                name="seconds"
                value={Duration.fromObject({
                  seconds:
                    currentSeconds - Math.floor(currentSeconds / 60) * 60,
                }).toFormat("ss")}
              />
            </>
          }
        />
      </Box>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Grid item>
          <Button
            sx={{
              fontSize: 32,
              fontWeight: 400,
              color: theme.palette.common.white,
            }}
            disabled={Math.floor(totalSeconds / 60) === 59}
            onClick={handleAddMinute}
          >
            +1:00
          </Button>
        </Grid>
        <Grid item>
          <IconButton
            sx={{
              backgroundColor: appColors.timerBackground,
              padding: 2,
              "&:hover": {
                backgroundColor: appColors.timerBackground,
              },
              pointerEvents: currentSeconds <= 0 ? "none" : "inherit",
              opacity: currentSeconds <= 0 ? 0.5 : 1,
            }}
            onClick={toggleTimerActive}
          >
            {isTimeActive ? (
              <PauseIcon
                sx={{ fontSize: 40, color: theme.palette.common.white }}
              />
            ) : (
              <PlayArrowIcon
                sx={{ fontSize: 40, color: theme.palette.common.white }}
              />
            )}
          </IconButton>
        </Grid>
        <Grid item>
          <Button
            sx={{
              fontSize: 32,
              fontWeight: 400,
              color: theme.palette.common.white,
              textTransform: "inherit",
            }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </ModalLayout>
  );
};

export default Timer;
