import React, { FC, memo } from "react";
import { Podcast } from "../../types/types";
import { Box } from "@mui/material";
interface AudioItemProps {
  data: Podcast;
}
const AudioItem: FC<AudioItemProps> = () => {
  return <Box width="100%"></Box>;
};

export default memo(AudioItem);
