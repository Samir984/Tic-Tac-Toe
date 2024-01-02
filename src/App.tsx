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
};

function Header({ setMode }: HeaderProps) {
  return (
    <header className="app__header">
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

function App() {
  const [gameMode, setGameMode] = useState<GameModeType>("single");

  return (
    <div className="app__container">
      <Header setMode={setGameMode} />
      <TicTacToeTable />
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
    case "click": {
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
        for (let i = 0; i < 3; i++) {
          if (
            gameArray[i * 3] !== "" &&
            gameArray[i * 3] === gameArray[i * 3 + 1] &&
            gameArray[i * 3] === gameArray[i * 3 + 2]
          ) {
            state.gameState = gameArray[i];
          }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
          if (
            gameArray[i] !== "" &&
            gameArray[i] === gameArray[i + 3] &&
            gameArray[i] === gameArray[i + 6]
          ) {
            state.gameState = gameArray[i];
          }
        }

        // Check diagonals
        if (
          gameArray[0] !== "" &&
          gameArray[0] === gameArray[4] &&
          gameArray[0] === gameArray[8]
        ) {
          state.gameState = gameArray[0];
        }
        if (
          gameArray[2] !== "" &&
          gameArray[2] === gameArray[4] &&
          gameArray[2] === gameArray[6]
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

function TicTacToeTable() {
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
              gameState={gameState}
            />
          );
        })}
      </div>
      {gameState && <div className="game__win">{gameState} won the game </div>}
    </>
  );
}

function TicTacToeEachBox({
  count,
  dispatch,
  field,
  gameState,
}: TicTacToeEachBoxProps) {
  const [symbol, setSymbol] = useState<string>("");

  return (
    <button
      onClick={() => {
        const symbolString = count % 2 === 0 ? "✔️" : "❌";
        dispatch({
          type: "click",
          payload: { count: count + 1, symbol: symbolString, field: field },
        });
        setSymbol(symbolString);
      }}
      disabled={symbol !== "" || gameState !== ""}
    >
      {symbol}
    </button>
  );
}

export default App;
