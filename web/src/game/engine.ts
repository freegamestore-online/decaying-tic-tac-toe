import { checkWin } from "./rules";
import type {
  Board,
  CellState,
  GameState,
  PlaceMoveResult,
  Player,
  Pos,
} from "./types";
import { ALL_POSITIONS } from "./types";

export function createInitialState(): GameState {
  return {
    board: {},
    currentPlayer: "X",
    turn: 0,
    phase: "playing",
    winner: null,
    winningLine: null,
  };
}

export function isValidPos(value: string): value is Pos {
  const [rowRaw, colRaw] = value.split(",");

  if (rowRaw === undefined || colRaw === undefined || value.split(",").length !== 2) {
    return false;
  }

  const row = Number(rowRaw);
  const col = Number(colRaw);

  return (
    Number.isInteger(row) &&
    Number.isInteger(col) &&
    row >= 0 &&
    row <= 2 &&
    col >= 0 &&
    col <= 2
  );
}

export function formatPos(row: number, col: number): Pos {
  return `${row},${col}` as Pos;
}

export function placeMove(state: GameState, pos: Pos): PlaceMoveResult {
  if (state.phase === "won") {
    return { success: false, error: "GAME_OVER" };
  }

  if (!isValidPos(pos) || !ALL_POSITIONS.includes(pos)) {
    return { success: false, error: "INVALID_POSITION" };
  }

  if (state.board[pos] !== undefined) {
    return { success: false, error: "CELL_OCCUPIED" };
  }

  const turn = state.turn + 1;
  const board: Board = {
    ...state.board,
    [pos]: {
      player: state.currentPlayer,
      turnPlaced: turn,
    },
  };

  const winResult = checkWin(board);
  if (winResult !== null) {
    return {
      success: true,
      state: {
        board,
        currentPlayer: state.currentPlayer,
        turn,
        phase: "won",
        winner: winResult.winner,
        winningLine: winResult.line,
      },
    };
  }

  let nextState: GameState = {
    board,
    currentPlayer: oppositePlayer(state.currentPlayer),
    turn,
    phase: "playing",
    winner: null,
    winningLine: null,
  };

  if (turn % 4 === 0) {
    nextState = applyDecay(nextState);
  }

  return { success: true, state: nextState };
}

/**
 * Selects the position to remove on a decay turn.
 * Removes the oldest piece belonging to the player with the most pieces;
 * when counts are tied, removes the globally oldest piece.
 */
export function getOldestPiece(state: GameState): Pos | null {
  const occupied = getOccupiedCells(state.board);

  if (occupied.length === 0) {
    return null;
  }

  const countByPlayer = countPieces(occupied);
  const xCount = countByPlayer.X;
  const oCount = countByPlayer.O;

  let candidates: readonly OccupiedCell[];

  if (xCount > oCount) {
    candidates = occupied.filter(([, cell]) => cell.player === "X");
  } else if (oCount > xCount) {
    candidates = occupied.filter(([, cell]) => cell.player === "O");
  } else {
    candidates = occupied;
  }

  return findOldestPosition(candidates);
}

export function applyDecay(state: GameState): GameState {
  const pos = getOldestPiece(state);

  if (pos === null) {
    return state;
  }

  const { [pos]: _removed, ...remainingCells } = state.board;

  return {
    ...state,
    board: remainingCells,
  };
}

type OccupiedCell = readonly [Pos, CellState];

function getOccupiedCells(board: Board): OccupiedCell[] {
  const occupied: OccupiedCell[] = [];

  for (const pos of ALL_POSITIONS) {
    const cell = board[pos];
    if (cell !== undefined) {
      occupied.push([pos, cell]);
    }
  }

  return occupied;
}

function countPieces(cells: readonly OccupiedCell[]): Record<Player, number> {
  let xCount = 0;
  let oCount = 0;

  for (const [, cell] of cells) {
    if (cell.player === "X") {
      xCount += 1;
    } else {
      oCount += 1;
    }
  }

  return { X: xCount, O: oCount };
}

function findOldestPosition(cells: readonly OccupiedCell[]): Pos | null {
  let oldest: OccupiedCell | null = null;

  for (const cell of cells) {
    if (oldest === null || cell[1].turnPlaced < oldest[1].turnPlaced) {
      oldest = cell;
    }
  }

  return oldest?.[0] ?? null;
}

function oppositePlayer(player: Player): Player {
  return player === "X" ? "O" : "X";
}
