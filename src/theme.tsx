import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const appColors = {
  background: "#546e7a",
};

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(255, 195, 0)",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
