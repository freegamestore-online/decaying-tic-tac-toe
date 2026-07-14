import type { ReactNode } from "react";

interface SidebarProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function Sidebar({ title, subtitle, children }: SidebarProps) {
  return (
    <aside className="hidden w-[var(--spacing-sidebar)] shrink-0 flex-col overflow-y-auto border-r border-[var(--line)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--panel)_92%,white),var(--panel))] lg:flex">
      <div className="border-b border-[var(--line)] px-6 py-5">
        <div className="mb-3 inline-flex rounded-full border border-[color-mix(in_srgb,var(--accent)_25%,var(--line))] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
          Decay mode
        </div>
        <h1 className="text-2xl text-[var(--ink)]">{title}</h1>
        <p className="mt-2 max-w-[24ch] text-sm text-[var(--muted)]">{subtitle}</p>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">{children}</div>
    </aside>
  );
}

interface ControlPanelProps {
  children: ReactNode;
}

export function ControlPanel({ children }: ControlPanelProps) {
  return (
    <div className="rounded-[var(--radius-card)] border border-[var(--line)] bg-[color-mix(in_srgb,var(--panel)_88%,transparent)] p-[var(--spacing-card)] shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm">
      {children}
    </div>
  );
}

interface BottomDockProps {
  children: ReactNode;
}

export function BottomDock({ children }: BottomDockProps) {
  return (
    <nav
      aria-label="Game controls"
      className="border-t border-[var(--line)] bg-[var(--glass)] px-4 py-4 backdrop-blur-xl lg:hidden"
    >
      {children}
    </nav>
  );
}

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function PrimaryButton({ label, onClick, disabled = false }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-[var(--radius-button)] bg-[linear-gradient(135deg,var(--accent),color-mix(in_srgb,var(--accent)_72%,black))] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(13,148,136,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(13,148,136,0.28)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
}
