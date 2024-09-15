import React, { ReactNode } from "react";
import { Box, Grid } from "@mui/material";
import Headline from "../../Components/Common/Headline";
import AppCard from "../../Components/Apps/AppCard";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ExtensionIcon from "@mui/icons-material/Extension";
import { Application } from "../../models/Applications";
import { useApps } from "../../hooks/useApps";

const Home: React.FC = () => {
  const getIcon = (shortName: string, color: string): ReactNode => {
    switch (shortName) {
      case "Timer":
        return <AccessAlarmIcon sx={{ color, fontSize: 40 }} />;
      default:
        return <ExtensionIcon sx={{ color, fontSize: 40 }} />;
    }
  };

  const { data } = useApps();

  return (
    <Box>
      <Headline title="Apps" hideBackButton />
      {data && (
        <Grid container spacing={2}>
          {data.apps.map((app: Application) => {
            return (
              <Grid item key={app.short_name}>
                <AppCard app={app} icon={getIcon(app.short_name, app.color)} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Home;
