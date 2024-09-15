import React, { ReactNode } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  darken,
  lighten,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Application } from "../../models/Applications";
import theme, { appColors } from "../../theme";

interface IProps {
  app: Application;
  icon: ReactNode;
  component?: ReactNode;
}

const AppCard: React.FC<IProps> = ({ app, icon, component = null }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(app.route);
  };

  return (
    <Card
      sx={{
        width: 350,
        borderRadius: 5,
        backgroundColor: darken(appColors.background, 0.3),
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          px={2}
          py={1}
        >
          <Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={64}
              height={64}
              sx={{
                backgroundColor: lighten(app.color, 0.7),
                borderRadius: 10,
              }}
            >
              {icon}
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }} minHeight={112}>
            <CardContent>
              <Typography
                component="div"
                variant="h6"
                color={theme.palette.common.white}
              >
                {app.long_name}
              </Typography>
              <Typography
                variant="subtitle2"
                color={theme.palette.common.white}
                component="div"
              >
                {app.description}
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </CardActionArea>
      {component && component}
    </Card>
  );
};

export default AppCard;
