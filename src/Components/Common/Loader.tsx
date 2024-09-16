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

const Loader: React.FC<IProps> = ({ size = 100, minHeight = 500 }) => {
  return (
    <LoaderEl sx={{ minHeight }}>
      <CircularProgress size={size} data-testid="progress" />
    </LoaderEl>
  );
};

export default Loader;
