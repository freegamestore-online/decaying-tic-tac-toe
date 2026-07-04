export { applyDecay, createInitialState, formatPos, getOldestPiece, isValidPos, placeMove } from "./engine";
export { checkWin } from "./rules";
export type {
  Board,
  CellState,
  GamePhase,
  GameState,
  PlaceMoveError,
  PlaceMoveResult,
  Player,
  Pos,
  Row,
  Col,
} from "./types";
export { ALL_POSITIONS, BOARD_SIZE } from "./types";
