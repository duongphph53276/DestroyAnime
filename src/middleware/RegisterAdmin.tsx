import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./useAuth";

const RegisterAdmin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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
    const registerData = {
      ...values,
      role: "admin",
      createdAt: new Date().toISOString(), // Thêm createdAt
    };

    try {
      await axios.post("http://localhost:3000/register", registerData);
      alert("Đăng ký tài khoản Admin thành công! Vui lòng đăng nhập.");
      navigate("/login"); // Chuyển hướng tới trang đăng nhập
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Chi tiết lỗi từ server:", error.response?.data);
        console.error("Lỗi đăng ký Admin:", error);
        alert("Đăng ký thất bại! " + (error.response?.data?.message || "Email có thể đã tồn tại."));
      } else {
        console.error("Lỗi không xác định:", error);
        alert("Đăng ký thất bại! Có lỗi xảy ra.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-4">Đăng Ký Admin</h2>
        <p className="text-gray-600 text-center mb-6">Tạo tài khoản Admin để quản lý hệ thống!</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Tên tài khoản"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
            minLength={6}
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
            disabled={loading}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký Admin"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterAdmin;