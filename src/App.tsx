import React from "react";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import PlayerHowler from "./unused/components/PlayerHowler/PlayerHowler";

function App() {
  return (
    <DefaultLayout>
      <div className="App">
        {/* <PlayerAudio /> */}
        <PlayerHowler />
      </div>
    </DefaultLayout>
  );
}

export default App;
