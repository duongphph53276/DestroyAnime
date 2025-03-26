import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Iuser } from "../../interfaces/user";
import { useOutletContext } from "react-router-dom";

const UserEdit = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<Iuser | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [lockReason, setLockReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const lockOptions = {
    "1d": 1 * 24 * 60 * 60 * 1000,
    "3d": 3 * 24 * 60 * 60 * 1000,
    "1w": 7 * 24 * 60 * 60 * 1000,
    "1m": 30 * 24 * 60 * 60 * 1000,
    "1y": 365 * 24 * 60 * 60 * 1000,
    "100y": 100 * 365 * 24 * 60 * 60 * 1000,
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
        setError("Không thể tải thông tin người dùng.");
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      alert("Vui lòng nhập mật khẩu mới!");
      return;
    }
    if (newPassword.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/users/${id}`, {
        password: newPassword,
      });
      alert("Cập nhật mật khẩu thành công!");
      setNewPassword("");
    } catch (err) {
      console.error("Lỗi khi cập nhật mật khẩu:", err);
      alert("Cập nhật mật khẩu thất bại!");
    }
  };

  const handleLockAccount = async (duration: keyof typeof lockOptions) => {
    if (!lockReason.trim()) {
      alert("Vui lòng nhập lý do khóa tài khoản!");
      return;
    }

    const lockUntil = new Date(Date.now() + lockOptions[duration]).toISOString();
    try {
      await axios.patch(`http://localhost:3000/users/${id}`, {
        isLocked: true,
        lockUntil,
        lockReason,
      });
      setUser((prev) =>
        prev ? { ...prev, isLocked: true, lockUntil, lockReason } : null
      );
      alert(`Khóa tài khoản thành công đến ${new Date(lockUntil).toLocaleString()}!`);
      setLockReason("");
    } catch (err) {
      console.error("Lỗi khi khóa tài khoản:", err);
      alert("Khóa tài khoản thất bại!");
    }
  };

  const handleUnlockAccount = async () => {
    try {
      await axios.patch(`http://localhost:3000/users/${id}`, {
        isLocked: false,
        lockUntil: null,
        lockReason: undefined,
      });
      setUser((prev) =>
        prev ? { ...prev, isLocked: false, lockUntil: null, lockReason: undefined } : null
      );
      alert("Mở khóa tài khoản thành công!");
    } catch (err) {
      console.error("Lỗi khi mở khóa tài khoản:", err);
      alert("Mở khóa tài khoản thất bại!");
    }
  };

  if (loading) {
    return (
      <div className={`text-center py-10 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Đang tải thông tin người dùng...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={`text-center py-10 ${darkMode ? "text-red-400" : "text-red-500"}`}>
        {error || "Không tìm thấy người dùng."}
      </div>
    );
  }

  return (
    <div className={`p-6 max-w-7xl mx-auto ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h2 className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"} mb-6`}>
        Chỉnh Sửa Người Dùng: {user.username}
      </h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Trạng thái:</strong> {user.isLocked ? "Khóa" : "Hoạt động"}</p>
          {user.isLocked && user.lockUntil && (
            <>
              <p><strong>Khóa đến:</strong> {new Date(user.lockUntil).toLocaleString()}</p>
              <p><strong>Lý do khóa:</strong> {user.lockReason || "Không có lý do"}</p>
            </>
          )}
          <p><strong>Ngày tạo tài khoản:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        </div>

        <div className="mb-6">
          <h3 className={`text-lg font-semibold ${darkMode ? "text-blue-300" : "text-blue-600"} mb-2`}>
            Cập nhật mật khẩu
          </h3>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới..."
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
              darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
            }`}
          />
          <button
            onClick={handleUpdatePassword}
            className={`mt-4 px-4 py-2 rounded-md ${
              darkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-500"
            } text-white transition`}
          >
            Cập nhật mật khẩu
          </button>
        </div>

        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? "text-blue-300" : "text-blue-600"} mb-2`}>
            Quản lý trạng thái tài khoản
          </h3>
          {user.isLocked ? (
            <button
              onClick={handleUnlockAccount}
              className={`px-4 py-2 rounded-md ${
                darkMode ? "bg-green-500 hover:bg-green-600" : "bg-green-600 hover:bg-green-500"
              } text-white transition`}
            >
              Mở khóa tài khoản
            </button>
          ) : (
            <>
              <textarea
                value={lockReason}
                onChange={(e) => setLockReason(e.target.value)}
                placeholder="Nhập lý do khóa tài khoản..."
                className={`w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                }`}
              />
              <div className="flex flex-wrap gap-2">
                {Object.keys(lockOptions).map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleLockAccount(duration as keyof typeof lockOptions)}
                    className={`px-4 py-2 rounded-md ${
                      darkMode ? "bg-red-500 hover:bg-red-600" : "bg-red-600 hover:bg-red-500"
                    } text-white transition`}
                  >
                    Khóa {duration}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => navigate("/admin/users")}
        className={`mt-6 px-4 py-2 rounded-md ${
          darkMode ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-300 hover:bg-gray-400"
        } text-white transition`}
      >
        Quay lại danh sách
      </button>
    </div>
  );
};

export default UserEdit;