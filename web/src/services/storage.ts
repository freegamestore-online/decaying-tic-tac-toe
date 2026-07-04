import { createInitialState } from "../game/engine";
import type { GameState, PersistedAppState } from "../types";

const STORAGE_KEY = "decaying-ttt-state";

export function loadPersistedState(): PersistedAppState | null {
  try {
    if (typeof localStorage === "undefined") {
      return null;
    }

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!isPersistedAppState(parsed)) {
      return null;
    }

    return {
      ...parsed,
      game: normalizeGameState(parsed.game),
    };
  } catch {
    return null;
  }
}

export function savePersistedState(state: PersistedAppState): void {
  if (typeof localStorage === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearPersistedState(): void {
  if (typeof localStorage === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}

export function createDefaultPersistedState(): PersistedAppState {
  return {
    version: 1,
    game: createInitialState(),
  };
}

function isPersistedAppState(value: unknown): value is PersistedAppState {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;
  return record.version === 1 && isGameState(record.game);
}

function isGameState(value: unknown): value is GameState {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.board === "object" &&
    record.board !== null &&
    (record.currentPlayer === "X" || record.currentPlayer === "O") &&
    typeof record.turn === "number" &&
    (record.phase === "playing" || record.phase === "won") &&
    (record.winner === null || record.winner === "X" || record.winner === "O")
  );
}

function normalizeGameState(state: GameState): GameState {
  return {
    ...state,
    winningLine: Array.isArray(state.winningLine) ? state.winningLine : null,
  };
}
