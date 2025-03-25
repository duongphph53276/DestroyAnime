import React from "react";
import { Link } from "react-router-dom";

const AboutGame: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Tiêu đề chính */}
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Giới Thiệu Về Game
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-10">
          Một tựa game chiến thuật đỉnh cao kết hợp phong cách anime heroes, được xây dựng trên nền tảng web để mang đến trải nghiệm độc đáo và dễ tiếp cận cho mọi người chơi!
        </p>

        {/* Hình ảnh minh họa (giả định) */}
        <div className="mb-10 flex justify-center">
          <img
            src="https://via.placeholder.com/600x300.png?text=Anime+Heroes+Game"
            alt="Anime Heroes Game"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>

        {/* Nội dung giới thiệu */}
        <section className="space-y-8">
          {/* Phần 1: Game là gì? */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Game Là Gì?
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Đây là một tựa game chiến thuật theo lượt lấy cảm hứng từ phong cách anime Nhật Bản, nơi bạn sẽ thu thập, xây dựng đội hình và điều khiển những anh hùng độc đáo để chinh phục các thử thách. Được phát triển hoàn toàn trên nền tảng web, game mang đến sự tiện lợi khi bạn có thể chơi trực tiếp trên trình duyệt mà không cần cài đặt, phù hợp với mọi thiết bị từ PC đến điện thoại.
            </p>
          </div>

          {/* Phần 2: Lối chơi */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Lối Chơi Chiến Thuật Đỉnh Cao
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Trong game, bạn sẽ đối mặt với các trận chiến đòi hỏi sự tính toán và lập kế hoạch thông minh. Mỗi anh hùng sở hữu kỹ năng riêng biệt, thuộc tính đa dạng (như nguyên tố, độ hiếm), và khả năng phối hợp độc đáo. Từ việc sắp xếp đội hình, chọn chiến thuật phù hợp, đến tối ưu hóa tài nguyên, mọi quyết định của bạn đều ảnh hưởng đến kết quả trận đấu.
            </p>
          </div>

          {/* Phần 3: Phong cách Anime */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Phong Cách Anime Đẹp Mắt
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Với thiết kế nhân vật đậm chất anime, từ các anh hùng Common bình dị đến những Mythic huyền thoại, game mang đến một thế giới sống động và đầy màu sắc. Hiệu ứng chiến đấu mượt mà cùng hình ảnh được chăm chút kỹ lưỡng sẽ khiến bạn đắm chìm trong từng trận đấu.
            </p>
          </div>

          {/* Phần 4: Tính năng nổi bật */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Tính Năng Nổi Bật
            </h2>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
              <li>
                <strong>Web-based:</strong> Chơi ngay trên trình duyệt, không cần tải về, hỗ trợ đa nền tảng.
              </li>
              <li>
                <strong>Hệ thống Rarity:</strong> Thu thập anh hùng từ Common đến cấp bí ẩn "???" với tỷ lệ hiếm 0.01%.
              </li>
              <li>
                <strong>Chiến thuật đa dạng:</strong> Tùy chỉnh đội hình, phối hợp kỹ năng để vượt qua kẻ thù.
              </li>
              <li>
                <strong>Cộng đồng:</strong> Tham gia các sự kiện, bảng xếp hạng để cạnh tranh với người chơi khác.
              </li>
            </ul>
          </div>

          {/* Phần 5: Tại sao chơi? */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Tại Sao Nên Chơi?
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Nếu bạn yêu thích chiến thuật, đam mê phong cách anime, và muốn trải nghiệm một tựa game dễ tiếp cận nhưng đầy chiều sâu, đây chính là lựa chọn hoàn hảo. Hãy bắt đầu hành trình của bạn, xây dựng đội hình trong mơ và trở thành chiến lược gia xuất sắc nhất!
            </p>
          </div>
        </section>

        {/* Nút kêu gọi hành động */}
        <div className="mt-10 text-center">
          <Link
            to="/docs/rarity-info"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Tìm Hiểu Hệ Thống Rarity
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutGame;