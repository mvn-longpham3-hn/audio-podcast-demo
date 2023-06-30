import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { Howl, Howler } from "howler";
import { Button } from "@mui/material";
const URL =
  "https://mp3-s1-zmp3.zmdcdn.me/7945cb6d1d29f477ad38/4186214056268099099?authen=exp=1688119773~acl=/7945cb6d1d29f477ad38/*~hmac=ee67ba156047e2ceaeeafc9492d4b87d&fs=MTY4Nzk0Njk3MzE4MHx3ZWJWNnwwfDMdUngMjI3LjIwLjEyMA";
const PlayerHowler: FC = () => {
  //   const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Howl>();
  const [soundId, setSoundId] = useState(0);

  useEffect(() => {
    setSound(
      new Howl({
        src: [URL],
        html5: true,
      })
    );
  }, []);

  const handlePlay = () => {
    if (!sound) return;
    // setIsPlaying(true);
    if (soundId) {
      sound.play(soundId);
    } else {
      const id = sound.play();
      setSoundId(id);
    }
  };

  const handlePause = () => {
    // setIsPlaying(false);
    if (!sound || !soundId) return;
    sound.pause(soundId);
  };

  const handlePlaybackForward = () => {
    const currentTime = sound?.seek();
    if (currentTime) {
      sound?.seek(currentTime + 10); // Forward 10 seconds
    }
  };

  return (
    <div>
      <button>{JSON.stringify(sound?.playing)}</button>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handlePlaybackForward}>Playback Forward 10s</button>
    </div>
  );
};

export default memo(PlayerHowler);
