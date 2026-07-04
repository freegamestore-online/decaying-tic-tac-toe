import type { Board, Player, Pos } from "./types";

const WIN_LINES: readonly (readonly Pos[])[] = [
  ["0,0", "0,1", "0,2"],
  ["1,0", "1,1", "1,2"],
  ["2,0", "2,1", "2,2"],
  ["0,0", "1,0", "2,0"],
  ["0,1", "1,1", "2,1"],
  ["0,2", "1,2", "2,2"],
  ["0,0", "1,1", "2,2"],
  ["0,2", "1,1", "2,0"],
] as const;

export interface WinningLine {
  readonly winner: Player;
  readonly line: readonly Pos[];
}

/**
 * Returns the winning player and line when three in a row exist, otherwise null.
 */
export function checkWin(board: Board): WinningLine | null {
  for (const line of WIN_LINES) {
    const [first, second, third] = line;
    const a = board[first];
    const b = board[second];
    const c = board[third];

    if (a && b && c && a.player === b.player && b.player === c.player) {
      return {
        winner: a.player,
        line,
      };
    }
  }

  return null;
}
