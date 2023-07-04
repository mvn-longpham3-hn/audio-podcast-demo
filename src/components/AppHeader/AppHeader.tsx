import { Box } from "@mui/material";
import React from "react";

const AppHeader = () => {
  return (
    <Box
      width="100vw"
      height={64}
      boxShadow={12}
      sx={(theme) => ({
        backgroundColor: theme.palette.divider,
      })}
    >
      HEADER
    </Box>
  );
};

export default AppHeader;
