import { placeMove } from "./engine";
import type { GameState, Pos, Player } from "./types";
import { ALL_POSITIONS } from "./types";

export function aiMove(state: GameState): Pos | null {
  const aiPlayer = state.currentPlayer;
  const opponent = oppositePlayer(aiPlayer);
  const openMoves = getOpenMoves(state.board);

  if (openMoves.length === 0) {
    return null;
  }

  const winningMove = findPriorityMove(state, aiPlayer, openMoves);
  if (winningMove !== null) {
    return winningMove;
  }

  const blockingMove = findPriorityMove(state, opponent, openMoves);
  if (blockingMove !== null) {
    return blockingMove;
  }

  const randomIndex = Math.floor(Math.random() * openMoves.length);
  return openMoves[randomIndex] ?? null;
}

function findPriorityMove(state: GameState, player: Player, moves: readonly Pos[]): Pos | null {
  for (const move of moves) {
    const simulatedState: GameState = {
      ...state,
      currentPlayer: player,
    };

    const result = placeMove(simulatedState, move);
    if (result.success && result.state.phase === "won" && result.state.winner === player) {
      return move;
    }
  }

  return null;
}

function getOpenMoves(board: GameState["board"]): Pos[] {
  const moves: Pos[] = [];

  for (const pos of ALL_POSITIONS) {
    if (board[pos] === undefined) {
      moves.push(pos);
    }
  }

  return moves;
}

function oppositePlayer(player: Player): Player {
  return player === "X" ? "O" : "X";
}
