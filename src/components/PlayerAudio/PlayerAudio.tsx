import { Box, CircularProgress, IconButton } from "@mui/material";
import React, {
  FC,
  RefObject,
  SyntheticEvent,
  createContext,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Controller from "./Controller/Controller";
import { Podcast } from "../../types/types";
import { StyledPlayer } from "./PlayerAudio.styles";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PlayerAudioTitle from "./Title/PlayerAudioTitle";

interface PlayerAudioContextProps {
  data: Podcast;
  audioRef: RefObject<HTMLAudioElement> | null;
  isPlay: boolean;
  volume: number; // percent
  currentTime: number; //second
  setCurrentTime: (currentTime: number) => void;
  setVolume: (volume: number) => void;
  setIsPlay: (isPlay: boolean) => void;
}

export const PlayerAudioContext = createContext<PlayerAudioContextProps>({
  data: {
    encodeId: "",
    duration: 0,
    title: "",
    artistsNames: "",
    alias: "",
    thumbnail: "",
  },
  audioRef: null,
  isPlay: false,
  volume: 100,
  currentTime: 0,
  setIsPlay: () => null,
  setCurrentTime: () => null,
  setVolume: () => null,
});

const PlayerAudio: FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [data, setData] = useState<Podcast | null>(null);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlay, setIsPlay] = useState(false);

  const callData = useCallback(async () => {
    try {
      await fetch("https://music-api-vip.vercel.app/api/infosong?id=ZW9BZ680")
        .then((data) => data.json())
        .then((data) => {
          setData(data.data);
        });
    } catch (error) {}
  }, []);

  useEffect(() => {
    callData();
  }, [callData]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlay) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTime, isPlay]);

  return (
    <Box width="100%" padding={2} display="flex" justifyContent="center">
      {data ? (
        <PlayerAudioContext.Provider
          value={{
            data,
            audioRef,
            isPlay,
            volume,
            currentTime,
            setCurrentTime: (value) => {
              if (audioRef.current) {
                audioRef.current.currentTime = value;
              }
              setCurrentTime(value);
            },
            setVolume: (value) => setVolume(value),
            setIsPlay: (value) => setIsPlay(value),
          }}
        >
          <StyledPlayer>
            <Box
              width="100%"
              height="100%"
              sx={{
                objectFit: "contain",
                background: `url(${data.thumbnail})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsPlay(!isPlay);
              }}
            >
              <IconButton
                className="hover-opacity-1"
                sx={{
                  opacity: isPlay ? 0 : 1,
                  transition: "all ease-in-out 100ms",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {isPlay ? (
                  <PauseCircleOutlineRoundedIcon sx={{ fontSize: 100 }} />
                ) : (
                  <PlayArrowRoundedIcon sx={{ fontSize: 100 }} />
                )}
              </IconButton>
            </Box>
            <audio
              ref={audioRef}
              src="https://mp3-s1-zmp3.zmdcdn.me/7945cb6d1d29f477ad38/4186214056268099099?authen=exp=1688119773~acl=/7945cb6d1d29f477ad38/*~hmac=ee67ba156047e2ceaeeafc9492d4b87d&fs=MTY4Nzk0Njk3MzE4MHx3ZWJWNnwwfDMdUngMjI3LjIwLjEyMA"
              autoPlay
              hidden
              onTimeUpdate={(event: SyntheticEvent<HTMLAudioElement>) => {
                const time = event.currentTarget.currentTime;
                const duration = event.currentTarget.duration;
                if (time === duration) {
                  setIsPlay(false);
                } else {
                  setCurrentTime(time);
                }
              }}
            />
            <PlayerAudioTitle />
            <Controller />
          </StyledPlayer>
        </PlayerAudioContext.Provider>
      ) : (
        <StyledPlayer
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </StyledPlayer>
      )}
    </Box>
  );
};

export default memo(PlayerAudio);
