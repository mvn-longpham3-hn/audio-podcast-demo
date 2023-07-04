import React, { memo, FC, useState, useRef, useEffect } from "react";
import Hls from "hls.js";

const audioUrl = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
//   "https://mp3-s1-zmp3.zmdcdn.me/7945cb6d1d29f477ad38/4186214056268099099?authen=exp=1688119773~acl=/7945cb6d1d29f477ad38/*~hmac=ee67ba156047e2ceaeeafc9492d4b87d&fs=MTY4Nzk0Njk3MzE4MHx3ZWJWNnwwfDMdUngMjI3LjIwLjEyMA";

const PlayerHls: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hls, setHls] = useState<Hls>();

  useEffect(() => {
    if (!audioRef.current) return;
    if (Hls.isSupported()) {
      console.log("run heres");
      const hls = new Hls();
      hls.loadSource(audioUrl);
      hls.attachMedia(audioRef.current);
      setHls(hls);
    } else if (audioRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      audioRef.current.src = audioUrl;
    }
  }, []);

  const handlePlay = () => {
    if (!audioRef.current) return;
    console.log("play");
    audioRef.current.play();
  };

  const handlePause = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
  };

  const handlePlaybackForward = () => {
    if (!audioRef.current) return;

    const currentTime = audioRef.current.currentTime;
    audioRef.current.currentTime = currentTime + 10; // Forward 10 seconds
  };

  return (
    <div>
      <audio ref={audioRef}></audio>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handlePlaybackForward}>Playback Forward 10s</button>
    </div>
  );
};

export default memo(PlayerHls);
