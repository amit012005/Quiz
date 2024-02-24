import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  console.log("usercontext called");
  const updateUser = (newUserInfo) => {
    setUserInfo(newUserInfo);
  };
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("incontext", user);
  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, );
  console.log("inside context", user);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
