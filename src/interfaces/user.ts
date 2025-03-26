export interface Iuser {
  id: number;
  username: string;
  image: string;
  email: string;
  phone: string;
  role: "admin" | "client";
  password?: string; // Mật khẩu (ẩn trong danh sách, chỉ dùng khi sửa)
  isLocked?: boolean; // Trạng thái khóa
  lockUntil?: string | null; // Thời điểm hết khóa (ISO date string)
  lockReason?: string; // Lý do khóa
  createdAt: string; // Thời điểm tạo tài khoản (ISO date string), bất biến
}

export type IuserForm = Omit<Iuser, "id">;