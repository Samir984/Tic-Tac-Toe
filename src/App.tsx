import React, { useReducer, useState } from "react";

type GameModeType = "single" | "dual";
type HeaderProps = {
  setMode: React.Dispatch<React.SetStateAction<GameModeType>>;
};

type TicTacToeEachBoxProps = {
  count: number;
  dispatch: React.Dispatch<ReducerAction>;
  field: number;
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
};

type ReducerAction = {
  type: string;
  payload: { count: number; symbol: string; field: number };
};

const initialState: GameReducer = {
  count: 0,
  gameArray: ["", "", "", "", "", "", "", "", ""],
};

const reducer = function (state: GameReducer, action: ReducerAction) {
  switch (action.type) {
    case "click":
      return {
        ...state,
        count: action.payload.count,
        gameArray: [
          ...state.gameArray.slice(0, action.payload.field - 1),
          action.payload.symbol,
          ...state.gameArray.slice(action.payload.field),
        ],
      };
    default:
      return state;
  }
};

function TicTacToeTable() {
  const [{ count, gameArray }, dispatch] = useReducer(reducer, initialState);
  console.log(gameArray);
  return (
    <div className="game__table">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ele) => {
        return (
          <TicTacToeEachBox
            key={ele}
            count={count}
            dispatch={dispatch}
            field={ele}
          />
        );
      })}
    </div>
  );
}

function TicTacToeEachBox({ count, dispatch, field }: TicTacToeEachBoxProps) {
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
      disabled={symbol !== ""}
    >
      {symbol}
    </button>
  );
}

export default App;
