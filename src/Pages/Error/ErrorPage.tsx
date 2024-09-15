import React from "react";
import { useNavigate } from "react-router-dom";

import { PageError } from "../../types";
import { Box, Button, Container, Typography } from "@mui/material";

interface IProps {
  type?: PageError;
}

const ErrorPage: React.FC<IProps> = ({ type = PageError.NotFound }) => {
  const isForbidden = type === PageError.Forbidden;
  const navigate = useNavigate();
  return (
    <Box textAlign="center" component={Container} maxWidth="md">
      <Typography variant="h4" color="primary" sx={{ mt: 8, fontWeight: 300 }}>
        {isForbidden ? "Forbidden" : "404 Not Found"}
      </Typography>
      <Box my={3}>
        {isForbidden ? (
          <Typography>You do not have access to this page.</Typography>
        ) : (
          <>
            <Typography>The page you requested could not be found.</Typography>
            <Typography>Please check the URL and try again.</Typography>
          </>
        )}
      </Box>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </Box>
  );
};

export default ErrorPage;
