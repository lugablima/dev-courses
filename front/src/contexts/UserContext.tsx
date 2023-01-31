import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  name: string;
  token: string;
  isAdmin: boolean;
}

export interface UserContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

function getLocalUser() {
  const localStorageUser = localStorage.getItem("user");

  if (!localStorageUser) {
    return null;
  }

  const localUser: User = JSON.parse(localStorageUser);

  return localUser;
}

const UserContext = createContext<UserContext | null>(null);

export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(getLocalUser());
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
