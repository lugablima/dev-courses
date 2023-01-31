import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface ReloadProviderProps {
  children: ReactNode;
}

export interface ReloadContext {
  reload: boolean | null;
  setReload: Dispatch<SetStateAction<boolean | null>>;
}

const ReloadContext = createContext<ReloadContext | null>(null);

export const useReloadContext = () => useContext(ReloadContext);

export default function ReloadProvider({ children }: ReloadProviderProps) {
  const [reload, setReload] = useState<boolean | null>(null);

  return (
    <ReloadContext.Provider value={{ reload, setReload }}>
      {children}
    </ReloadContext.Provider>
  );
}
