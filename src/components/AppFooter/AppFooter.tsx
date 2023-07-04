import { Box } from "@mui/material";
import React from "react";

const AppFooter = () => {
  return (
    <Box
      width="100vw"
      height="50vh"
      boxShadow={12}
      marginTop="auto"
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.main,
      })}
    >
      FOOTER
    </Box>
  );
};

export default AppFooter;
