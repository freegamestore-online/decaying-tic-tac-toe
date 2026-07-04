import type { CellState, Pos } from "../game/types";

interface CellProps {
  pos: Pos;
  cell: CellState | undefined;
  isLastMove: boolean;
  isWinningCell: boolean;
  disabled: boolean;
  row: number;
  col: number;
  age: number | null;
  onClick: (pos: Pos) => void;
}

export function Cell({
  pos,
  cell,
  isLastMove,
  isWinningCell,
  disabled,
  row,
  col,
  age,
  onClick,
}: CellProps) {
  const isEmpty = cell === undefined;
  const isExpiring = age !== null && age >= 3;
  const ageLabel = isEmpty || age === null ? null : age.toString();
  const label = isEmpty
    ? `Row ${row + 1}, column ${col + 1}, empty`
    : `Row ${row + 1}, column ${col + 1}, ${cell.player}, age ${age ?? 0}`;

  return (
    <button
      type="button"
      role="gridcell"
      aria-rowindex={row + 1}
      aria-colindex={col + 1}
      aria-label={label}
      disabled={disabled || !isEmpty}
      onClick={() => onClick(pos)}
      className={[
        "relative flex aspect-square items-center justify-center overflow-hidden rounded-[var(--radius-button)] border text-3xl font-semibold transition-all duration-300 ease-out",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
        isEmpty && !disabled
          ? "cursor-pointer border-[var(--line)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--paper)_92%,white),var(--paper))] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
          : "cursor-default border-[var(--line)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--paper)_92%,white),var(--paper))]",
        !isEmpty && cell.player === "X" ? "text-[var(--ink)]" : "",
        !isEmpty && cell.player === "O" ? "text-[var(--accent)]" : "",
        !isEmpty && age === 0 ? "shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--accent)_35%,transparent)]" : "",
        !isEmpty && age !== null && age >= 1 && age <= 2 ? "opacity-75" : "",
        isExpiring ? "text-[var(--error)] ring-2 ring-[var(--error)] ring-inset cell-expiring" : "",
        isWinningCell ? "bg-[color-mix(in_srgb,var(--success)_16%,var(--panel))] ring-2 ring-[var(--success)] ring-offset-2 ring-offset-[var(--panel)]" : "",
        isLastMove && !isWinningCell ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--panel)]" : "",
        disabled || !isEmpty ? "disabled:opacity-100" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {cell?.player ?? ""}
      {!isEmpty && ageLabel !== null ? (
        <span
          aria-hidden="true"
          className={[
            "absolute right-2 top-2 inline-flex min-w-6 items-center justify-center rounded-full border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em]",
            isExpiring
              ? "border-[var(--error)] bg-[color-mix(in_srgb,var(--error)_12%,transparent)] text-[var(--error)]"
              : "border-[var(--line)] bg-[color-mix(in_srgb,var(--panel)_84%,transparent)] text-[var(--muted)]",
          ].join(" ")}
        >
          {ageLabel}
        </span>
      ) : null}
    </button>
  );
}
