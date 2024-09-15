import React, { ReactNode } from "react";

import { Box, Fade } from "@mui/material";
import Loader from "./Loader";

interface IProps {
  loading?: boolean;
  fetching?: boolean;
  children: ReactNode;
}

const Body: React.FC<IProps> = ({
  loading = false,
  fetching = false,
  children,
}) => {
  return (
    <>
      <Box
        p={3}
        sx={{
          paddingTop: 11,
        }}
      >
        <Fade in={loading || fetching}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              zIndex: 2,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
            }}
          />
        </Fade>
        <Box sx={{ visibility: loading ? "hidden" : "visible" }}>
          {children}
        </Box>
      </Box>
      {(fetching || loading) && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1302,
          }}
        >
          <Loader />
        </Box>
      )}
    </>
  );
};

export default Body;
