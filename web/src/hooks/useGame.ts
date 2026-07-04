import { useEffect, useState } from "react";
import { aiMove } from "../game/ai";
import { createInitialState, placeMove } from "../game/engine";
import type { GameState, Pos } from "../game/types";
import { savePersistedState } from "../services/storage";

export function useGame(initialState: GameState = createInitialState()) {
  const [state, setState] = useState<GameState>(() => initialState);

  useEffect(() => {
    savePersistedState({
      version: 1,
      game: state,
    });
  }, [state]);

  useEffect(() => {
    if (state.phase !== "playing" || state.currentPlayer !== "O") {
      return;
    }

    const timer = window.setTimeout(() => {
      setState((current) => {
        if (current.phase !== "playing" || current.currentPlayer !== "O") {
          return current;
        }

        const aiChoice = aiMove(current);
        if (aiChoice === null) {
          return current;
        }

        const result = placeMove(current, aiChoice);
        return result.success ? result.state : current;
      });
    }, 360);

    return () => {
      window.clearTimeout(timer);
    };
  }, [state]);

  function move(pos: Pos) {
    setState((current) => {
      if (current.phase !== "playing" || current.currentPlayer !== "X") {
        return current;
      }

      const result = placeMove(current, pos);
      return result.success ? result.state : current;
    });
  }

  function reset() {
    setState(createInitialState());
  }

  return { state, move, reset };
}
