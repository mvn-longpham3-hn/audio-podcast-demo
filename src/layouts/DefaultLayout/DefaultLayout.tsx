import React, { FC, memo } from "react";
import AppHeader from "../../components/AppHeader/AppHeader";
import AppFooter from "../../components/AppFooter/AppFooter";
import { Box } from "@mui/material";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <AppHeader />
      {children}
      <AppFooter />
    </Box>
  );
};

export default memo(DefaultLayout);
