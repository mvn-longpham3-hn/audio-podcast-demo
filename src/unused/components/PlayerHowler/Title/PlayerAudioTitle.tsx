import React, { FC, memo, useContext } from "react";

import { Box, Typography } from "@mui/material";
import { PlayerAudioContext } from "../PlayerHowler";

const PlayerAudioTitle: FC = () => {
  const { data } = useContext(PlayerAudioContext);

  return (
    <Box
      position="absolute"
      top={0}
      right={0}
      left={0}
      width="100%"
      padding={1.5}
      className="hover-opacity-1"
      sx={{
        opacity: 0,
        transition: "all ease-in-out 100ms",
      }}
    >
      <Typography>
        {data.title} - {data.artistsNames}
      </Typography>
    </Box>
  );
};

export default memo(PlayerAudioTitle);
