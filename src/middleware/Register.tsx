import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./useAuth";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth(); // Không cần login nữa, chỉ kiểm tra user

  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/");
    }
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const registerData = { ...values, role: "client" };

    try {
      await axios.post("http://localhost:3000/register", registerData);
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      alert("Đăng ký thất bại! Email có thể đã tồn tại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-yellow-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-yellow-600 text-center mb-4">Đăng Ký</h2>
        <p className="text-gray-600 text-center mb-6">Tạo tài khoản mới để bắt đầu!</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Tên tài khoản"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
            disabled={loading}
          />
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
            pattern="[0-9]{10,11}"
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-500"
            required
            minLength={6}
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-500 transition"
            disabled={loading}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-yellow-600 font-semibold">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;