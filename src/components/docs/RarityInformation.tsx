import React from "react";
import { RarityType } from "../../interfaces/Rarity";
import { gachaRates } from "../../utils/gachaSystem";

// Định nghĩa type cho Rarity


// Dữ liệu thông tin rarity
const rarityInfo = [
  {
    type: "Common" as RarityType,
    color: "bg-gray-200 border-gray-400 text-gray-800",
    description:
      "Cấp độ cơ bản nhất trong game, đại diện bởi màu bạc. Các anh hùng Common dễ kiếm, có chỉ số trung bình và phù hợp cho người chơi mới bắt đầu. Tỷ lệ xuất hiện cao, chiếm phần lớn trong hệ thống gacha.",
    dropRate: `${gachaRates.Common}%`,
  },
  {
    type: "Uncommon" as RarityType,
    color: "bg-green-200 border-green-500 text-green-800",
    description:
      "Cấp độ hiếm hơn Common, mang màu xanh lục đặc trưng. Anh hùng Uncommon có chỉ số tốt hơn một chút so với Common và thường xuất hiện trong các nhiệm vụ cơ bản hoặc vòng quay gacha thông thường.",
    dropRate: `${gachaRates.Uncommon}%`,
  },
  {
    type: "Rare" as RarityType,
    color: "bg-blue-200 border-blue-500 text-blue-800",
    description:
      "Cấp độ hiếm với màu xanh biển nổi bật. Anh hùng Rare sở hữu sức mạnh đáng kể, thích hợp cho các trận đấu tầm trung. Chúng khó kiếm hơn và thường được người chơi săn đón để xây dựng đội hình ổn định.",
    dropRate: `${gachaRates.Rare}%`,
  },
  {
    type: "Epic" as RarityType,
    color: "bg-purple-200 border-purple-500 text-purple-800",
    description:
      "Cấp độ cao cấp với màu tím sang trọng. Anh hùng Epic có chỉ số vượt trội, kỹ năng mạnh mẽ, và là lựa chọn lý tưởng cho các thử thách khó. Tỷ lệ xuất hiện giảm đáng kể so với các cấp thấp hơn.",
    dropRate: `${gachaRates.Epic}%`,
  },
  {
    type: "Legendary" as RarityType,
    color: "bg-yellow-200 border-yellow-500 text-yellow-800",
    description:
      "Cấp độ huyền thoại, biểu tượng bằng màu vàng rực rỡ. Anh hùng Legendary cực kỳ hiếm, sở hữu sức mạnh áp đảo và kỹ năng độc đáo, là niềm mơ ước của mọi người chơi muốn chinh phục bảng xếp hạng.",
    dropRate: `${gachaRates.Legendary}%`,
  },
  {
    type: "Mythic" as RarityType,
    color: "bg-red-200 border-red-500 text-red-800",
    description:
      "Cấp độ thần thoại với màu đỏ đầy quyền lực. Anh hùng Mythic là những chiến binh tối thượng, có chỉ số vượt xa mọi cấp độ khác và kỹ năng thay đổi cục diện trận đấu. Sự xuất hiện của chúng là cực kỳ hiếm.",
    dropRate: `${gachaRates.Mythic}%`,
  },
  {
    type: "???" as RarityType,
    color: "bg-gradient-to-r from-pink-500 to-purple-500 border-pink-500 text-white",
    description:
      "Cấp độ bí ẩn nhất, được tô điểm bởi hiệu ứng 7 màu lộng lẫy. Anh hùng ở cấp '???' là những thực thể siêu hiếm, mang sức mạnh không thể đoán trước và thường gắn liền với các sự kiện đặc biệt trong game. Đây là báu vật mà mọi người chơi đều khao khát.",
    dropRate: `${gachaRates["???"]}%`,
  },
];

const RarityInformation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Hiểu Biết Về Rarity Trong Game
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Tìm hiểu về các cấp độ rarity của anh hùng, từ Common đến cấp bí ẩn "???". Mỗi cấp độ có đặc điểm riêng biệt và tỷ lệ xuất hiện khác nhau trong hệ thống gacha.
        </p>

        <div className="space-y-6">
          {rarityInfo.map((rarity) => (
            <div
              key={rarity.type}
              className={`p-6 rounded-lg shadow-md border-2 ${rarity.color} transition-all hover:shadow-lg`}
            >
              <h2 className="text-2xl font-semibold mb-2">{rarity.type}</h2>
              <p className="text-lg mb-4">{rarity.description}</p>
              <p className="text-sm font-medium">
                <span className="font-bold">Tỷ lệ xuất hiện:</span> {rarity.dropRate}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-gray-600 dark:text-gray-400">
          <p>
            Lưu ý: Tỷ lệ xuất hiện chỉ mang tính tham khảo và có thể thay đổi tùy theo sự kiện hoặc cập nhật game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RarityInformation;