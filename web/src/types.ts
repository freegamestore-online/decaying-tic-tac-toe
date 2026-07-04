import type { GameState } from "./game/types";

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
} from "./game/types";

export { ALL_POSITIONS, BOARD_SIZE } from "./game/types";
export { createInitialState } from "./game/engine";

export interface PersistedAppState {
  version: 1;
  game: GameState;
}
