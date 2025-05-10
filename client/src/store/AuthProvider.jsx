import { useEffect, useState, useCallback } from "react";
import { AuthContext } from ".";
import { authenticateUser } from "../api/auth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const token = localStorage.getItem("taskDutyToken"); //retrieve accessToke from localstorage

  const handleLogout = useCallback(() => {
    localStorage.removeItem("taskDutyToken");
    setAccessToken("");
    setUser(null);
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchUser = async () => {
      setChecking(true);
      try {
        const res = await authenticateUser(token);
        if (res.status === 200) {
          setUser(res.data);
          setChecking(false);
        }
      } catch (error) {
        console.error(error);
        if (
          error &&
          error?.response?.data?.error === "Broken or expired token"
        ) {
          handleLogout();
        }
      }
    };
    fetchUser();
  }, [token, handleLogout]);

  console.log(user);

  return (
    <AuthContext.Provider
      value={{
        setAccessToken,
        accessToken,
        user,
        checking,
        token,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
