import React from "react";
import { Link } from "react-router-dom";

const FAQ: React.FC = () => {
  const faqData = [
    {
      question: "Game này là gì?",
      answer:
        "Đây là một tựa game chiến thuật theo lượt lấy cảm hứng từ phong cách anime Nhật Bản. Bạn sẽ thu thập anh hùng, xây dựng đội hình và tham gia các trận đấu chiến thuật trên nền tảng web, không cần tải về.",
    },
    {
      question: "Làm thế nào để bắt đầu chơi?",
      answer:
        "Bạn chỉ cần truy cập trang web chính thức của game qua trình duyệt, đăng ký tài khoản (nếu có), và bắt đầu chơi ngay. Không cần cài đặt thêm phần mềm.",
    },
    {
      question: "Rarity là gì và ảnh hưởng thế nào đến anh hùng?",
      answer:
        "Rarity là cấp độ hiếm của anh hùng, từ Common đến '???'. Anh hùng có rarity cao hơn (như Mythic và ???) sẽ có chỉ số mạnh hơn và kỹ năng độc đáo, giúp bạn vượt qua các thử thách khó.",
    },
    {
      question: "Làm sao để có được anh hùng cấp '???'?",
      answer:
        "Anh hùng cấp '???' cực kỳ hiếm với tỷ lệ xuất hiện chỉ 0.1%. Bạn có thể thử vận may qua hệ thống gacha hoặc tham gia các sự kiện đặc biệt trong game để tăng cơ hội.",
    },
    {
      question: "Làm thế nào để chọn class phù hợp cho đội hình?",
      answer:
        "Mỗi class (Tanker, Assassin, Fighter, v.v.) có vai trò riêng. Ví dụ, Tanker bảo vệ đội, Assassin tiêu diệt nhanh, còn Healer hỗ trợ. Hãy cân bằng đội hình dựa trên chiến thuật và kẻ thù bạn đối mặt.",
    },
    {
      question: "Nguyên tố nào mạnh nhất trong game?",
      answer:
        "Không có nguyên tố nào mạnh nhất tuyệt đối. Hệ thống khắc chế (Nước > Lửa > Đất > Gió > Sét > Băng > Nước) quyết định sức mạnh tùy theo tình huống. Hãy tận dụng khắc chế để thắng lợi.",
    },
    {
      question: "Làm thế nào để xây dựng đội hình mạnh?",
      answer:
        "Kết hợp các anh hùng có class và nguyên tố bổ trợ lẫn nhau, ưu tiên khắc chế kẻ thù. Ví dụ, thêm Tanker để bảo vệ Mage hoặc Healer để duy trì đội trong trận dài.",
    },
    {
      question: "Game có hỗ trợ chơi trên điện thoại không?",
      answer:
        "Có, game được thiết kế trên nền tảng web nên tương thích với cả PC và điện thoại, miễn là bạn có trình duyệt và kết nối internet.",
    },
    {
      question: "Làm sao để tham gia sự kiện trong game?",
      answer:
        "Theo dõi thông báo trên trang chủ hoặc kênh cộng đồng của game để biết lịch sự kiện. Một số sự kiện yêu cầu hoàn thành nhiệm vụ hoặc sử dụng vé đặc biệt để tham gia.",
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Câu Hỏi Thường Gặp (FAQ)
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-10">
          Dưới đây là những câu hỏi phổ biến nhất từ người chơi. Nếu bạn cần thêm thông tin, hãy xem các tài liệu khác trong mục tài liệu!
        </p>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md transition-all hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {faq.question}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/docs"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            Về Trang Giới Thiệu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;