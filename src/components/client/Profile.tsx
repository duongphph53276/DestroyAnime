import React from "react";
import { useAuth } from "../../middleware/useAuth";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Vui lòng đăng nhập để xem thông tin profile.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-yellow-600 mb-4">Thông tin cá nhân</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Ảnh đại diện:</label>
          <img
            src={user.image || "https://picsum.photos/200"} // Dùng ảnh mẫu nếu không có
            alt="Ảnh đại diện"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Tên người dùng:</label>
          <p className="text-gray-900">{user.username}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Email:</label>
          <p className="text-gray-900">{user.email}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Số điện thoại:</label>
          <p className="text-gray-900">{user.phone}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Vai trò:</label>
          <p className="text-gray-900">{user.role}</p>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold">Ngày tạo tài khoản:</label>
          <p className="text-gray-900">{new Date(user.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;