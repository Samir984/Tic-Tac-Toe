import React, { useReducer, useState } from "react";

type GameModeType = "single" | "dual";
type HeaderProps = {
  setMode: React.Dispatch<React.SetStateAction<GameModeType>>;
};

type TicTacToeEachBoxProps = {
  count: number;
  dispatch: React.Dispatch<ReducerAction>;
  field: number;
  gameState: string;
  mode: string;
};

function Header({ setMode }: HeaderProps) {
  return (
    <header className="app__header">
      <div className="app__logo">Tiktoktok </div>
      <select
        className="app__setting"
        onChange={(e) => setMode(e.target.value as GameModeType)}
        defaultValue={"dual"}
      >
        <option value="dual">Dual</option>
        <option value="single">with computer</option>
      </select>
    </header>
  );
}

function App() {
  const [gameMode, setGameMode] = useState<GameModeType>("single");

  return (
    <div className="app__container">
      <Header setMode={setGameMode} />
      <TicTacToeTable mode={gameMode} />
    </div>
  );
}

type GameReducer = {
  count: number;
  gameArray: string[];
  gameState: string;
};

type ReducerAction = {
  type: string;
  payload: { count: number; symbol: string; field: number };
};

const initialState: GameReducer = {
  count: 0,
  gameArray: ["", "", "", "", "", "", "", "", ""],
  gameState: "",
};

const reducer = function (state: GameReducer, action: ReducerAction) {
  switch (action.type) {
    case "nextMove": {
      const temp = {
        ...state,
        count: action.payload.count,
        gameArray: [
          ...state.gameArray.slice(0, action.payload.field - 1),
          action.payload.symbol,
          ...state.gameArray.slice(action.payload.field),
        ],
      };

      const checkForWinner = function (gameArray: string[]) {
        if (
          gameArray[0] !== "" &&
          gameArray[0] === gameArray[1] &&
          gameArray[1] == gameArray[2]
        ) {
          state.gameState = gameArray[0];
        } else if (
          gameArray[3] !== "" &&
          gameArray[3] === gameArray[4] &&
          gameArray[4] === gameArray[5]
        ) {
          state.gameState = gameArray[3];
        } else if (
          gameArray[6] !== "" &&
          gameArray[6] === gameArray[7] &&
          gameArray[7] === gameArray[8]
        ) {
          state.gameState = gameArray[6];
        } else if (
          gameArray[0] !== "" &&
          gameArray[0] === gameArray[3] &&
          gameArray[3] === gameArray[6]
        ) {
          state.gameState = gameArray[0];
        } else if (
          gameArray[1] === gameArray[4] &&
          gameArray[4] === gameArray[7] &&
          gameArray[1] !== ""
        ) {
          state.gameState = gameArray[1];
        } else if (
          gameArray[2] !== "" &&
          gameArray[2] === gameArray[5] &&
          gameArray[5] === gameArray[8]
        ) {
          state.gameState = gameArray[2];
        } else if (
          gameArray[0] !== "" &&
          gameArray[0] === gameArray[4] &&
          gameArray[4] === gameArray[8]
        ) {
          state.gameState = gameArray[0];
        } else if (
          gameArray[2] !== "" &&
          gameArray[2] === gameArray[4] &&
          gameArray[4] === gameArray[6]
        ) {
          state.gameState = gameArray[2];
        }
      };
      checkForWinner(temp.gameArray);
      return temp;
    }
    default:
      return state;
  }
};

function TicTacToeTable({ mode }: { mode: string }) {
  const [{ count, gameState }, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div className="game__table">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele) => {
          return (
            <TicTacToeEachBox
              key={ele}
              count={count}
              dispatch={dispatch}
              field={ele}
              mode={mode}
              gameState={gameState}
            />
          );
        })}
      </div>
      {gameState && <div className="game__win">{gameState} won the game </div>}
      {count === 9 && gameState === "" && (
        <div className="game__win">Noone won </div>
      )}
    </>
  );
}

function TicTacToeEachBox({
  count,
  dispatch,
  field,
  gameState,
  mode,
}: TicTacToeEachBoxProps) {
  const [symbol, setSymbol] = useState<string>("");

  const nextMove = function () {
    const symbolString = count % 2 === 0 ? "✔️" : "❌";
    if (mode === "dual") {
      dispatch({
        type: "nextMove",
        payload: { count: count + 1, symbol: symbolString, field: field },
      });
      setSymbol(symbolString);
    } else {
      dispatch({
        type: "nextMove",
        payload: { count: count + 1, symbol: symbolString, field: field },
      });
      computerMove();

      setSymbol(symbolString);
    }
  };

  return (
    <button onClick={nextMove} disabled={symbol !== "" || gameState !== ""}>
      {symbol}
    </button>
  );
}
function computerMove() {}

export default App;
