import { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType } from "../interfaces/AuthContextType";
import { Iuser } from "../interfaces/user";
import axios from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Iuser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncUserData = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser: Iuser = JSON.parse(storedUser);
        try {
          const { data } = await axios.get(`http://localhost:3000/users/${parsedUser.id}`);
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        } catch (error) {
          console.error("Lỗi khi đồng bộ dữ liệu người dùng:", error);
          setUser(parsedUser);
        }
      }
      setLoading(false);
    };

    syncUserData();
  }, []);

  const login = async (userData: Iuser) => {
    const updatedUser = {
      ...userData,
      createdAt: userData.createdAt || new Date().toISOString(), // Gán createdAt nếu chưa có
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = async (updatedData: Partial<Iuser>) => {
    if (!user) throw new Error("Không có người dùng để cập nhật");

    // Loại bỏ createdAt khỏi updatedData để không ghi đè
    const { createdAt, ...dataToUpdate } = updatedData;

    try {
      const response = await axios.put(
        `http://localhost:3000/users/${user.id}`,
        { ...user, ...dataToUpdate }, // Không bao gồm createdAt
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const updatedUser = response.data as Iuser;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      const updatedUser = { ...user, ...dataToUpdate } as Iuser; // Không bao gồm createdAt
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {!loading ? children : <div>Đang tải...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};