import React, { useEffect, useState } from "react";

type GameModeType = "single" | "dual";
type HeaderProps = {
  setMode: React.Dispatch<React.SetStateAction<GameModeType>>;
};

function App() {
  const [gameMode, setGameMode] = useState<GameModeType>("single");

  return (
    <div className="app__container">
      <Header setMode={setGameMode} />

      <TicTacToeTable />
    </div>
  );
}

function Header({ setMode }: HeaderProps) {
  return (
    <header className="app__heeader">
      <div className="app__logo">Tiktoktok </div>
      <select
        className="app__setting"
        onChange={(e) => setMode(e.target.value as GameModeType)}
      >
        <option value="single">singlePlayer</option>
        <option value="dual">Dual</option>
      </select>
    </header>
  );
}
function TicTacToeTable() {
  return (
    <div className="game__table">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele) => {
        return <TicTacToeEachBox key={ele} />;
      })}
    </div>
  );
}

// ✔️

function TicTacToeEachBox() {
  const [putSymbol, setPutSymbol] = useState<string>("");

  return <button onClick={() => setPutSymbol("❌")}>{putSymbol}</button>;
}

export default App;
