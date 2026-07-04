import { useMemo } from "react";
import { createDefaultPersistedState, loadPersistedState } from "../services/storage";

export function useAppBootstrap() {
  const initialState = useMemo(() => {
    return loadPersistedState() ?? createDefaultPersistedState();
  }, []);

  return { initialState };
}
