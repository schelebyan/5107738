import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Body, Header, Snack } from "../Components/Common";
import { ErrorPage } from "../Pages/Error";
import { useMessages } from "../context";
import { Box } from "@mui/material";
import { appColors } from "../theme";

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props): JSX.Element {
  const {
    message,
    type: messageType,
    clearMessage,
    pageLoading,
    pageFetching,
    clearPageError,
    pageError,
  } = useMessages();

  const location = useLocation();

  useEffect(() => {
    clearPageError();
  }, [location, clearPageError]);

  return (
    <Box
      sx={{
        backgroundColor: appColors.background,
        minHeight: "100vh",
      }}
    >
      <Header />
      <Body loading={pageLoading} fetching={pageFetching}>
        {pageError ? <ErrorPage type={pageError} /> : children}
      </Body>
      <Snack type={messageType} open={Boolean(message)} onClose={clearMessage}>
        <>{message}</>
      </Snack>
    </Box>
  );
}
