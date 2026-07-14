import { GameShell, GameTopbar } from "@freegamestore/games";
import { Board } from "./components/Board";
import { BottomDock, ControlPanel, PrimaryButton, Sidebar } from "./components/Shell";
import { useAppBootstrap } from "./hooks/useAppBootstrap";
import { useGame } from "./hooks/useGame";
import { ALL_POSITIONS } from "./game/types";
import type { Player, Pos } from "./game/types";

const APP_TITLE = "Decaying Tic Tac Toe";
const APP_SUBTITLE = "Marks fade - plan before they disappear.";

function GameRules() {
  return (
    <div className="space-y-2 text-sm text-[var(--ink)]">
      <p>Play X and O as usual, taking turns.</p>
      <p>
        Whenever your move would leave the board full with no winner, the
        oldest mark on the board disappears instead of ending in a draw.
      </p>
      <p>Get three in a row to win — the game never ties.</p>
    </div>
  );
}

function GameAbout() {
  return (
    <p className="text-sm text-[var(--muted)]">
      Built for{" "}
      <a
        href="https://freegamestore.online"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        freegamestore.online
      </a>{" "}
      — free forever, no tracking.
    </p>
  );
}

interface GameControlsProps {
  currentPlayer: Player;
  turn: number;
  openCells: number;
  winner: Player | null;
  winningLine: readonly Pos[] | null;
  isGameOver: boolean;
  isAITurn: boolean;
  onReset: () => void;
}

function GameControls({
  currentPlayer,
  turn,
  openCells,
  winner,
  winningLine,
  isGameOver,
  isAITurn,
  onReset,
}: GameControlsProps) {
  return (
    <ControlPanel>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base text-[var(--ink)]">Status</h2>
        <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {isAITurn ? "AI turn" : "Human turn"}
        </span>
      </div>

      {isGameOver && winner !== null ? (
        <div
          role="status"
          className="mt-3 rounded-[var(--radius-button)] border border-[var(--success)] bg-[color-mix(in_srgb,var(--success)_12%,transparent)] px-4 py-3"
        >
          <p className="text-sm font-semibold text-[var(--success)]">
            {winner} wins!
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Game over after {turn} {turn === 1 ? "turn" : "turns"}.
          </p>
          {winningLine !== null ? (
            <p className="mt-2 text-xs text-[var(--muted)]">
              The winning line is highlighted on the board.
            </p>
          ) : null}
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-[var(--muted)]">Current turn</p>
          <p
            className={[
              "inline-flex min-w-12 items-center justify-center rounded-[var(--radius-button)] border px-3 py-2 text-2xl font-bold transition-all duration-300",
              currentPlayer === "X"
                ? "border-[var(--line)] bg-[var(--panel)] text-[var(--ink)]"
                : "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)] shadow-[0_10px_24px_rgba(13,148,136,0.14)]",
            ].join(" ")}
          >
            {currentPlayer}
          </p>
          <div className="space-y-1 text-xs text-[var(--muted)]">
            <p>You play X. The AI plays O.</p>
            <p>Turn {turn}</p>
            <p>{isAITurn ? "AI is choosing a move." : "You are up. Claim the board."}</p>
            <p>
              {`${openCells} open ${openCells === 1 ? "cell" : "cells"} left before the board would draw and the oldest move decays.`}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4">
        <PrimaryButton label="New game" onClick={onReset} />
      </div>
    </ControlPanel>
  );
}

export default function App() {
  const { initialState } = useAppBootstrap();
  const { state, move, reset } = useGame(initialState.game);
  const isGameOver = state.phase === "won";
  const isAITurn = !isGameOver && state.currentPlayer === "O";
  const openCells = ALL_POSITIONS.length - Object.keys(state.board).length;

  const controls = (
    <GameControls
      currentPlayer={state.currentPlayer}
      turn={state.turn}
      openCells={openCells}
      winner={state.winner}
      winningLine={state.winningLine}
      isGameOver={isGameOver}
      isAITurn={isAITurn}
      onReset={reset}
    />
  );

  return (
    <GameShell
      topbar={
        <GameTopbar
          title={APP_TITLE}
          stats={[
            { label: "Turn", value: state.turn },
            { label: "Open", value: openCells, accent: openCells <= 2 },
          ]}
          rules={<GameRules />}
          about={<GameAbout />}
          onRestart={reset}
        />
      }
    >
      <div className="app-shell">
        <Sidebar title={APP_TITLE} subtitle={APP_SUBTITLE}>
          {controls}
        </Sidebar>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <main className="flex flex-1 flex-col items-center justify-center gap-4 overflow-y-auto px-4 py-4 lg:px-8">
            {isGameOver && state.winner !== null && (
              <div
                role="status"
                aria-live="polite"
                className="w-full max-w-sm rounded-[var(--radius-card)] border border-[var(--success)] bg-[color-mix(in_srgb,var(--success)_12%,transparent)] px-4 py-3 text-center lg:hidden"
              >
                <p className="font-display text-lg font-semibold text-[var(--success)]">
                  {state.winner} wins!
                </p>
              </div>
            )}

            <Board state={state} onCellClick={move} />
          </main>

          <BottomDock>{controls}</BottomDock>
        </div>
      </div>
    </GameShell>
  );
}
