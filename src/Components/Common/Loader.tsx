import { Box, CircularProgress, styled } from "@mui/material";

const LoaderEl = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

interface IProps {
  size?: number;
  minHeight?: number;
}

export default function Loader({
  size = 100,
  minHeight = 500,
}: IProps): JSX.Element {
  return (
    <LoaderEl sx={{ minHeight }}>
      <CircularProgress size={size} data-testid="progress" />
    </LoaderEl>
  );
}
