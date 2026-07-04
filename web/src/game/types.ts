export type Player = "X" | "O";

export type Row = 0 | 1 | 2;
export type Col = 0 | 1 | 2;

/** Board position key in `"row,col"` format, e.g. `"0,0"`. */
export type Pos = `${Row},${Col}`;

export interface CellState {
  readonly player: Player;
  readonly turnPlaced: number;
}

/** Sparse board: occupied cells only, keyed by position. */
export type Board = Readonly<Partial<Record<Pos, CellState>>>;

export type GamePhase = "playing" | "won";

export interface GameState {
  readonly board: Board;
  readonly currentPlayer: Player;
  readonly turn: number;
  readonly phase: GamePhase;
  readonly winner: Player | null;
  readonly winningLine: readonly Pos[] | null;
}

export type PlaceMoveError = "GAME_OVER" | "CELL_OCCUPIED" | "INVALID_POSITION";

export type PlaceMoveResult =
  | { readonly success: true; readonly state: GameState }
  | { readonly success: false; readonly error: PlaceMoveError };

export const BOARD_SIZE = 3 as const;

export const ALL_POSITIONS: readonly Pos[] = [
  "0,0",
  "0,1",
  "0,2",
  "1,0",
  "1,1",
  "1,2",
  "2,0",
  "2,1",
  "2,2",
] as const;
