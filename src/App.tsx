import React from "react";
import "./App.css";
import PlayerHowler from "./components/PlayerHowler/PlayerHowler";
import PlayerHls from "./components/PlayerHls/PlayerHls";
// import PlayerAudio from "./components/PlayerAudio/PlayerAudio";

function App() {
  return (
    <div className="App">
      {/* <PlayerAudio /> */}
      <PlayerHowler />
      {/* <PlayerHls /> */}
    </div>
  );
}

export default App;
