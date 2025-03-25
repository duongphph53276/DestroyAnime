import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import axios from "axios";
import bcrypt from "bcryptjs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data: users } = await axios.get("http://localhost:3000/users");
      const foundUser = users.find((u: any) => u.email === email);

      if (!foundUser) {
        alert("Email không tồn tại!");
        setLoading(false);
        return;
      }

      // Giả định mật khẩu không băm; nếu backend băm, cần dùng bcrypt
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
        alert("Mật khẩu không đúng!");
        setLoading(false);
        return;
      }

      login(foundUser);
      navigate(foundUser.role === "admin" ? "/admin" : "/");
      alert("Đăng nhập thành công!");
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Đã xảy ra lỗi khi đăng nhập!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      <input
        type="email"
        placeholder="Nhập email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Nhập mật khẩu..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </div>
  );
};

export default Login;