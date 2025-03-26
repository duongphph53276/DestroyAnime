import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import axios from "axios";
import bcrypt from "bcryptjs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [lockedMessage, setLockedMessage] = useState<string | null>(null);
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

      if (foundUser.isLocked) {
        const lockUntil = foundUser.lockUntil ? new Date(foundUser.lockUntil) : null;
        const now = new Date();

        if (lockUntil && lockUntil > now) {
          setLockedMessage(
            `Tài khoản của bạn đã bị khóa đến ${lockUntil.toLocaleString()}. Lý do: ${
              foundUser.lockReason || "Không có lý do"
            }.`
          );
          setLoading(false);
          return;
        } else {
          await axios.patch(`http://localhost:3000/users/${foundUser.id}`, {
            isLocked: false,
            lockUntil: null,
            lockReason: undefined,
          });
        }
      }

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-2xl w-full max-w-md border border-purple-500">
        <h2 className="text-3xl font-extrabold text-yellow-400 text-center mb-6">Đăng Nhập</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        {/* Input Email */}
        <input
          type="email"
          placeholder="Nhập email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-400 transition-all duration-300"
        />

        {/* Input Password */}
        <input
          type="password"
          placeholder="Nhập mật khẩu..."
          value={password}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="w-full p-3 mb-6 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-400 transition-all duration-300"
        />

        {/* Button Login */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {/* Locked Message Modal */}
        {lockedMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl max-w-sm border border-red-600">
              <h3 className="text-lg font-semibold text-red-500 mb-2">Tài khoản bị khóa</h3>
              <p className="text-gray-300 mb-4">{lockedMessage}</p>
              <button
                className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300"
                onClick={() => setLockedMessage(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
        </form>
      </div>
    </div>
  );
};

export default Login;