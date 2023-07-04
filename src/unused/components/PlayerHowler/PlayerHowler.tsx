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
import { Podcast } from "../../../types/types";
import { StyledPlayer } from "./PlayerHowler.styles";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PlayerAudioTitle from "./Title/PlayerAudioTitle";
import { Howl } from "howler";

const URL =
  // "https://lossless-audio-streamer-production.up.railway.app/api/play/battleful-days";
  // "https://lossless-audio-streamer-production.up.railway.app/api/play/fantastic-music-sorrow";
  "https://files.podlovers.org/LOV003.mp3";
//
// "https://www.learningcontainer.com/wp-content/uploads/2020/02/Sample-FLAC-File.flac";
// "https://mp3-s1-zmp3.zmdcdn.me/7945cb6d1d29f477ad38/4186214056268099099?authen=exp=1688119773~acl=/7945cb6d1d29f477ad38/*~hmac=ee67ba156047e2ceaeeafc9492d4b87d&fs=MTY4Nzk0Njk3MzE4MHx3ZWJWNnwwfDMdUngMjI3LjIwLjEyMA";
interface PlayerAudioContextProps {
  data: Podcast;
  //   audioRef: RefObject<HTMLAudioElement> | null;
  sound?: Howl;
  soundId: number;
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
  //   audioRef: null,
  soundId: 0,
  isPlay: false,
  volume: 100,
  currentTime: 0,
  setIsPlay: () => null,
  setCurrentTime: () => null,
  setVolume: () => null,
});

const PlayerAudio: FC = () => {
  //   const audioRef = useRef<HTMLAudioElement | null>(null);
  const [data, setData] = useState<Podcast | null>(null);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [url, setUrl] = useState<string>("");

  const [sound, setSound] = useState<Howl>();
  const [soundId, setSoundId] = useState(0);

  useEffect(() => {
    const s = new Howl({
      src: [URL],
      html5: true,
      onplay: () => {
        console.log("play");
        const interval = window.setInterval(() => {
          const crTime = s.seek();
          setCurrentTime(crTime);
        }, 1000);
        s.on("pause", () => {
          console.log("pause");
          window.clearInterval(interval);
        });
      },
    });

    setSound(s);
  }, []);

  const callData = useCallback(async () => {
    try {
      //   await fetch("https://music-api-vip.vercel.app/api/song?id=ZW9BZ680")
      //     .then((data) => data.json())
      //     .then((data) => {
      //       setUrl(data.data[128]);
      //     });
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
    if (!sound) return;
    if (isPlay) {
      if (soundId) {
        sound.play(soundId);
      } else {
        const id = sound.play();
        setSoundId(id);
      }
    } else {
      if (soundId) {
        sound.pause(soundId);
      }
    }
  }, [sound, isPlay, soundId]);

  return (
    <Box width="100%" padding={2} display="flex" justifyContent="center">
      {data ? (
        <PlayerAudioContext.Provider
          value={{
            data,
            sound,
            soundId,
            isPlay,
            volume,
            currentTime,
            setCurrentTime: (value) => {
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
