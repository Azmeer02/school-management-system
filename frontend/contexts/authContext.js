import { createContext, useState, useContext, useEffect } from "react";

const AuthConext = createContext({
  user: {},
  setUser: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthConext.Provider value={{ user, setUser }}>
      {children}
    </AuthConext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthConext);
