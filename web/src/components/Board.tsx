import { getOldestPiece } from "../game/engine";
import type { Board as BoardType, GameState, Pos } from "../game/types";
import { ALL_POSITIONS, BOARD_SIZE } from "../game/types";
import { Cell } from "./Cell";

interface BoardProps {
  state: GameState;
  onCellClick: (pos: Pos) => void;
}

function getLastMove(board: BoardType, turn: number): Pos | null {
  if (turn === 0) {
    return null;
  }

  for (const pos of ALL_POSITIONS) {
    if (board[pos]?.turnPlaced === turn) {
      return pos;
    }
  }

  return null;
}

export function Board({ state, onCellClick }: BoardProps) {
  const lastMove = getLastMove(state.board, state.turn);
  const disabled = state.phase === "won" || state.currentPlayer === "O";
  const winningCells = state.winningLine === null ? null : new Set(state.winningLine);
  const openCells = ALL_POSITIONS.length - Object.keys(state.board).length;
  const nextToDecay = openCells === 1 ? getOldestPiece(state) : null;

  return (
    <section
      aria-label="Game board"
      className="mx-auto w-full max-w-sm rounded-[var(--radius-card)] border border-[var(--line)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--panel)_92%,transparent),var(--panel))] p-[var(--spacing-card)] shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-all duration-300"
    >
      <div
        className="grid aspect-square grid-cols-3 gap-[var(--spacing-grid)]"
        role="grid"
        aria-rowcount={BOARD_SIZE}
        aria-colcount={BOARD_SIZE}
      >
        {ALL_POSITIONS.map((pos) => {
          const [rowRaw, colRaw] = pos.split(",");
          const row = Number(rowRaw);
          const col = Number(colRaw);
          const cell = state.board[pos];

          return (
            <Cell
              key={pos}
              pos={pos}
              cell={cell}
              isLastMove={pos === lastMove}
              isWinningCell={winningCells?.has(pos) ?? false}
              isExpiring={pos === nextToDecay}
              disabled={disabled}
              row={row}
              col={col}
              age={cell === undefined ? null : state.turn - cell.turnPlaced}
              onClick={onCellClick}
            />
          );
        })}
      </div>
    </section>
  );
}
