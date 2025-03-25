import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Iuser } from "../../interfaces/user"; // Đảm bảo đường dẫn đúng

const UserList = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>(); // Lấy darkMode từ Outlet
  const [users, setUsers] = useState<Iuser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/users");
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách người dùng:", err);
        setError("Không thể tải danh sách người dùng. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className={`text-center py-10 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Đang tải danh sách người dùng...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-10 ${darkMode ? "text-red-400" : "text-red-500"}`}>
        {error}
      </div>
    );
  }

  return (
    <div className={`p-6 max-w-7xl mx-auto ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h2 className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"} mb-6`}>
        Danh Sách Người Dùng
      </h2>
      <div className="overflow-x-auto">
        <table
          className={`min-w-full shadow-md rounded-lg overflow-hidden ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <thead className={`${darkMode ? "bg-blue-500" : "bg-blue-600"} text-white`}>
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Trạng thái khóa</th>
              <th className="py-3 px-4 text-left">Thời gian khóa</th>
              <th className="py-3 px-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`border-b ${darkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-200 hover:bg-gray-100"}`}
              >
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      user.role === "admin"
                        ? darkMode
                          ? "bg-green-900 text-green-300"
                          : "bg-green-100 text-green-800"
                        : darkMode
                        ? "bg-yellow-900 text-yellow-300"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {user.isLocked ? (
                    <span className={darkMode ? "text-red-400" : "text-red-600"}>Khóa</span>
                  ) : (
                    <span className={darkMode ? "text-green-400" : "text-green-600"}>Hoạt động</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {user.lockUntil ? new Date(user.lockUntil).toLocaleString() : "Không có"}
                </td>
                <td className="py-3 px-4">
                  <Link
                    to={`/admin/users/${user.id}`}
                    className={`text-blue-500 hover:underline ${darkMode ? "text-blue-300" : "text-blue-500"}`}
                  >
                    Chỉnh sửa
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;