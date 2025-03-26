import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../../middleware/useAuth";
import { IuserForm } from "../../interfaces/user";

const ProfileEdit = () => {
  const { user, updateUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IuserForm>({
    defaultValues: {
      username: user?.username || "",
      image: user?.image || "https://picsum.photos/200", // Giá trị mặc định
      email: user?.email || "",
      phone: user?.phone || "",
      role: user?.role || "client",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IuserForm> = async (data) => {
    try {
      const updatedData: Partial<IuserForm> = {
        username: data.username,
        image: data.image, // Thêm trường image
        email: data.email,
        phone: data.phone,
        role: data.role,
      };
      if (data.password) {
        updatedData.password = data.password;
      }

      await updateUser(updatedData);
      alert("Cập nhật profile thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật profile:", error);
      alert("Có lỗi xảy ra khi cập nhật profile.");
    }
  };

  if (!user) {
    return <div>Vui lòng đăng nhập để xem profile.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-yellow-600 mb-4">Chỉnh sửa hồ sơ</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Ảnh đại diện */}
        <div>
          <label htmlFor="image" className="block text-gray-700">
            URL ảnh đại diện
          </label>
          <input
            id="image"
            type="text"
            {...register("image", { required: "URL ảnh là bắt buộc" })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
          <img
            src={user.image || "https://picsum.photos/200"}
            alt="Preview"
            className="mt-2 w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-gray-700">
            Tên người dùng
          </label>
          <input
            id="username"
            type="text"
            {...register("username", { required: "Tên người dùng là bắt buộc" })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email là bắt buộc",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email không hợp lệ",
              },
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-gray-700">
            Số điện thoại
          </label>
          <input
            id="phone"
            type="text"
            {...register("phone", {
              required: "Số điện thoại là bắt buộc",
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: "Số điện thoại phải là 10-11 chữ số",
              },
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-gray-700">
            Mật khẩu mới (để trống nếu không đổi)
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Mật khẩu phải dài ít nhất 6 ký tự",
              },
            })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Role (chỉ hiển thị) */}
        <div>
          <label htmlFor="role" className="block text-gray-700">
            Vai trò
          </label>
          <input
            id="role"
            type="text"
            value={user.role}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        {/* CreatedAt (chỉ hiển thị) */}
        <div>
          <label htmlFor="createdAt" className="block text-gray-700">
            Ngày tạo tài khoản
          </label>
          <input
            id="createdAt"
            type="text"
            value={new Date(user.createdAt).toLocaleString()}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;