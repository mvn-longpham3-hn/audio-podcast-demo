import { Box, styled } from "@mui/material";

export const StyledPlayer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "16/9",
  background: theme.palette.common.black,
  overflow: "hidden",
  "&:hover .hover-opacity-1": {
    opacity: 1,
  },
  "&:hover .hover-opacity-0": {
    opacity: 0,
  },
}));

// #PlayerAudio_Title,.PlayerAudio_PlayIcon
