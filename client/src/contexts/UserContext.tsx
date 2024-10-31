import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios"; // Assuming you're using axios for API requests

type UserContextType = {
  role: number; // 1 for admin, 2 for user, etc.
  setRole: (role: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<number>(2); // Default role (e.g., user)

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
        setRole(response.data.role);
      } catch (error) {
        console.error("Failed to fetch user role", error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
