import { Iuser } from "./user";

export interface AuthContextType {
    user: Iuser | null;
    login: (user: Iuser) => void;
    logout: () => void;
    updateUser: (updatedData: Partial<Iuser>) => Promise<Iuser>;
  }