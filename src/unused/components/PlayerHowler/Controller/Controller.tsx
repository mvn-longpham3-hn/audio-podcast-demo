import { Box, IconButton, LinearProgress, Slider, Stack } from "@mui/material";
import React, { FC, memo, useContext, useEffect, useMemo } from "react";

import Replay10RoundedIcon from "@mui/icons-material/Replay10Rounded";
import Forward10RoundedIcon from "@mui/icons-material/Forward10Rounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";

import VolumeMuteRoundedIcon from "@mui/icons-material/VolumeMuteRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeDownRoundedIcon from "@mui/icons-material/VolumeDownRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { PlayerAudioContext } from "../PlayerHowler";

interface ControllerProps {}

const Controller: FC<ControllerProps> = () => {
  const {
    data,
    // audioRef,
    sound,
    soundId,
    volume,
    currentTime,
    isPlay,
    setCurrentTime,
    setVolume,
    setIsPlay,
  } = useContext(PlayerAudioContext);

  const handleChangeVolume = (_: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };
  const handleChangeCurrentTime = (_: Event, newValue: number | number[]) => {
    if (sound) {
      sound.seek(newValue as number, soundId);
    }
  };

  const VolumeIcon = useMemo(() => {
    if (volume === 0) {
      return <VolumeOffRoundedIcon />;
    } else if (volume < 10) {
      return <VolumeMuteRoundedIcon />;
    } else if (volume < 50) {
      return <VolumeDownRoundedIcon />;
    }
    return <VolumeUpRoundedIcon />;
  }, [volume]);

  return (
    <>
      <Box
        position="absolute"
        left={0}
        bottom={0}
        right={0}
        width="100%"
        padding={1.25}
        className="hover-opacity-1"
        sx={{
          opacity: 0,
          transition: "all ease-in-out 100ms",
        }}
      >
        <Slider
          value={currentTime}
          max={data.duration}
          onChange={handleChangeCurrentTime}
          style={{
            position: "absolute",
            top: 0,
            left: 8,
            width: "calc(100% - 16px)",
            padding: 0,
          }}
        />
        <Stack alignItems="center" spacing={0.75} direction="row">
          <IconButton
            size="small"
            disabled={currentTime === 0}
            onClick={() => {
              setCurrentTime(currentTime - 10 < 0 ? 0 : currentTime - 10);
            }}
          >
            <Replay10RoundedIcon />
          </IconButton>
          <IconButton autoFocus size="small" onClick={() => setIsPlay(!isPlay)}>
            {isPlay ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
          </IconButton>
          <IconButton
            size="small"
            disabled={currentTime > data.duration - 1}
            onClick={() => {
              setCurrentTime(
                currentTime + 10 > data.duration
                  ? data.duration
                  : currentTime + 10
              );
            }}
          >
            <Forward10RoundedIcon />
          </IconButton>

          <Stack
            direction="row"
            alignItems="center"
            width={200}
            marginLeft={2}
            spacing={1.5}
          >
            <IconButton
              size="small"
              onClick={() => setVolume(volume === 0 ? 100 : 0)}
            >
              {VolumeIcon}
            </IconButton>
            <Slider
              value={volume}
              onChange={handleChangeVolume}
              aria-label="Volume"
              size="small"
            />
          </Stack>
        </Stack>
      </Box>
      <Box
        className="hover-opacity-0"
        width="100%"
        position="absolute"
        left={0}
        bottom={0}
        right={0}
      >
        <LinearProgress
          variant="determinate"
          value={(100 * currentTime) / data.duration}
        />
      </Box>
    </>
  );
};

export default memo(Controller);
