import React from "react";
import { Link } from "react-router-dom";
import { HeroClass } from "../../interfaces/HeroClass";

// Định nghĩa type cho HeroClass

// Dữ liệu thông tin về các class
const classInfo = [
    {
      type: "Tanker" as HeroClass,
      color: "bg-gray-300 border-gray-500 text-gray-800",
      description:
        "Những người hùng đứng đầu chiến tuyến, nổi bật với khả năng chịu đựng sát thương vượt trội. Tanker có lượng HP và phòng thủ cao, thường được sử dụng để bảo vệ đồng đội và thu hút sự chú ý của kẻ thù. Họ là lá chắn sống động trong mọi trận chiến.",
      strengths: "HP cao, phòng thủ mạnh, khả năng chống chịu tốt.",
      weaknesses: "Tốc độ chậm, sát thương thấp.",
    },
    {
      type: "Assassin" as HeroClass,
      color: "bg-red-200 border-red-500 text-red-800",
      description:
        "Các sát thủ nhanh nhẹn và nguy hiểm, chuyên tiêu diệt mục tiêu đơn lẻ trong tích tắc. Assassin sở hữu tốc độ cao và sát thương bộc phát, thường nhắm vào kẻ thù yếu máu như Mage hoặc Healer để thay đổi cục diện trận đấu.",
      strengths: "Sát thương bộc phát, tốc độ cao, né tránh tốt.",
      weaknesses: "HP thấp, dễ bị hạ gục nếu bị tập trung.",
    },
    {
      type: "Fighter" as HeroClass,
      color: "bg-orange-200 border-orange-500 text-orange-800",
      description:
        "Chiến binh cân bằng giữa tấn công và phòng thủ, Fighter là những người hùng đa năng trong đội hình. Họ có thể gây sát thương đáng kể đồng thời chịu đựng được một lượng tổn thương vừa phải, phù hợp cho nhiều tình huống chiến đấu.",
      strengths: "Cân bằng giữa sát thương và chống chịu, linh hoạt.",
      weaknesses: "Không nổi bật ở một khía cạnh cụ thể.",
    },
    {
      type: "Healer" as HeroClass,
      color: "bg-green-200 border-green-500 text-green-800",
      description:
        "Những người hỗ trợ không thể thiếu, Healer giữ vai trò hồi phục HP và tăng cường sức mạnh cho đồng đội. Dù không mạnh về sát thương, họ là yếu tố then chốt để duy trì đội hình trong các trận chiến kéo dài.",
      strengths: "Hồi phục, buff đồng đội, duy trì trận đấu lâu dài.",
      weaknesses: "Sát thương thấp, dễ bị nhắm đến bởi Assassin.",
    },
    {
      type: "Mage" as HeroClass,
      color: "bg-purple-200 border-purple-500 text-purple-800",
      description:
        "Pháp sư với sức mạnh ma thuật kinh hoàng, Mage gây sát thương diện rộng và áp đặt hiệu ứng bất lợi lên kẻ thù. Họ là lựa chọn lý tưởng để tiêu diệt nhiều mục tiêu cùng lúc, nhưng cần được bảo vệ cẩn thận.",
      strengths: "Sát thương diện rộng, kỹ năng khống chế mạnh.",
      weaknesses: "HP thấp, tốc độ chậm, dễ bị tiêu diệt sớm.",
    },
    {
      type: "Archer" as HeroClass,
      color: "bg-blue-200 border-blue-500 text-blue-800",
      description:
        "Xạ thủ tầm xa với khả năng tấn công chính xác và liên tục. Archer gây sát thương ổn định từ khoảng cách an toàn, thường nhắm vào kẻ thù ở hàng sau để hỗ trợ đội hình chính diện.",
      strengths: "Sát thương tầm xa, tốc độ tấn công nhanh.",
      weaknesses: "Phòng thủ yếu, phụ thuộc vào vị trí trong đội hình.",
    },
  ];
  
  const ClassInformation: React.FC = () => {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Tiêu đề chính */}
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Thông Tin Về Lớp Nhân Vật
          </h1>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-10">
            Khám phá các lớp nhân vật trong game, từ Tanker mạnh mẽ đến Archer linh hoạt. Mỗi lớp có vai trò riêng biệt, giúp bạn xây dựng đội hình chiến thuật hoàn hảo!
          </p>
  
          {/* Chia thành 2 cột */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classInfo.map((heroClass) => (
              <div
                key={heroClass.type}
                className={`p-6 rounded-lg shadow-md border-2 ${heroClass.color} transition-all hover:shadow-lg`}
              >
                <h2 className="text-2xl font-semibold mb-2">{heroClass.type}</h2>
                <p className="text-lg mb-4">{heroClass.description}</p>
                <p className="text-sm font-medium">
                  <span className="font-bold">Điểm mạnh:</span> {heroClass.strengths}
                </p>
                <p className="text-sm font-medium">
                  <span className="font-bold">Điểm yếu:</span> {heroClass.weaknesses}
                </p>
              </div>
            ))}
          </div>
  
          {/* Nút kêu gọi hành động */}
          <div className="mt-10 text-center">
            <Link
              to="/docs"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mr-4"
            >
              Về Trang Giới Thiệu
            </Link>
            <Link
              to="/docs/rarity-info"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Xem Hệ Thống Rarity
            </Link>
          </div>
        </div>
      </div>
    );
  };
  

export default ClassInformation;