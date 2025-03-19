import React from 'react'

const ElementInformation = () => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">
          Hệ Thống 8 Nguyên Tố
        </h1>
      </div>

      {/* Element Sections in Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            icon: '🌊',
            name: 'Nước (Water)',
            traits: 'Linh hoạt, mạnh mẽ, có khả năng kiểm soát môi trường.',
            abilities: 'Hồi máu, làm chậm kẻ địch, tạo lớp bảo vệ từ nước.',
            counters: '🔥 Lửa (Dập tắt lửa)',
            counteredBy: '❄️ Băng (Nước bị đóng băng)',
          },
          {
            icon: '🔥',
            name: 'Lửa (Fire)',
            traits: 'Đại diện cho sự hủy diệt, nhiệt độ cao, sức mạnh bùng cháy.',
            abilities: 'Gây sát thương theo thời gian (thiêu đốt), bùng nổ mạnh mẽ.',
            counters: '🏔️ Đất (Lửa làm đất khô cằn hoặc nung chảy)',
            counteredBy: '🌊 Nước (Nước dập tắt lửa)',
          },
          {
            icon: '🏔️',
            name: 'Đất (Earth)',
            traits: 'Cứng cáp, bền bỉ, có khả năng phòng thủ cực cao.',
            abilities: 'Giảm sát thương nhận vào, tạo lá chắn hoặc địa hình cản trở.',
            counters: '🌪️ Gió (Đất chặn gió, làm gió mất sức mạnh)',
            counteredBy: '🔥 Lửa (Đất bị thiêu đốt hoặc nung chảy)',
          },
          {
            icon: '🌪️',
            name: 'Gió (Wind)',
            traits: 'Tốc độ cao, linh hoạt, khó nắm bắt.',
            abilities: 'Tăng tốc độ di chuyển, đẩy lùi kẻ địch, gây sát thương diện rộng.',
            counters: '⚡ Sét (Gió dẫn sét, tăng sức mạnh sét)',
            counteredBy: '🏔️ Đất (Đất chặn đứng gió)',
          },
          {
            icon: '⚡',
            name: 'Sét (Thunder)',
            traits: 'Tốc độ, sát thương cao, khó đoán và nguy hiểm.',
            abilities: 'Gây sát thương xuyên giáp, đánh trúng nhiều mục tiêu.',
            counters: '❄️ Băng (Sét làm băng tan vỡ)',
            counteredBy: '🌪️ Gió (Gió làm sét mất hướng)',
          },
          {
            icon: '❄️',
            name: 'Băng (Frost)',
            traits: 'Lạnh giá, kiên cố, có khả năng khống chế.',
            abilities: 'Làm chậm hoặc đóng băng kẻ địch, tạo lớp bảo vệ băng.',
            counters: '🌊 Nước (Đóng băng nước)',
            counteredBy: '⚡ Sét (Sét phá vỡ băng)',
          },
          {
            icon: '☀️',
            name: 'Ánh Sáng (Light)',
            traits: 'Thuần khiết, mạnh mẽ, hiện thân của công lý và sức mạnh thần thánh.',
            abilities: 'Hồi máu, tăng sức mạnh đồng đội, kháng hiệu ứng xấu.',
            counters: '🌑 Bóng Tối (Ánh sáng xua tan bóng tối)',
            counteredBy: '🌑 Bóng Tối (Bóng tối che lấp ánh sáng)',
          },
          {
            icon: '🌑',
            name: 'Bóng Tối (Dark)',
            traits: 'Bí ẩn, nguy hiểm, mang lại nỗi sợ hãi và sức mạnh tà ác.',
            abilities: 'Gây hiệu ứng xấu, hút sinh lực, triệu hồi sinh vật bóng tối.',
            counters: '☀️ Ánh Sáng (Nhấn chìm ánh sáng trong bóng tối)',
            counteredBy: '☀️ Ánh Sáng (Ánh sáng xua tan bóng tối)',
          },
        ].map((element, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">
              {element.icon} {element.name}
            </h2>
            <p className="text-gray-600"><strong>Đặc điểm:</strong> {element.traits}</p>
            <p className="text-gray-600"><strong>Khả năng:</strong> {element.abilities}</p>
            <p className="text-green-600"><strong>Khắc chế:</strong> {element.counters}</p>
            <p className="text-red-600"><strong>Bị khắc chế bởi:</strong> {element.counteredBy}</p>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Tóm tắt hệ thống khắc chế</h3>

        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border border-gray-300 px-3 py-2 font-semibold">Nguyên Tố</th>
              <th className="border border-gray-300 px-3 py-2 font-semibold">Khắc Chế</th>
              <th className="border border-gray-300 px-3 py-2 font-semibold">Bị Khắc Chế</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2">🌊 Nước (Water)</td>
              <td className="border border-gray-300 px-3 py-2 text-green-600">🔥 Lửa</td>
              <td className="border border-gray-300 px-3 py-2 text-red-600">❄️ Băng</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2">🔥 Lửa (Fire)</td>
              <td className="border border-gray-300 px-3 py-2 text-green-600">🏔️ Đất</td>
              <td className="border border-gray-300 px-3 py-2 text-red-600">🌊 Nước</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2">🏔️ Đất (Earth)</td>
              <td className="border border-gray-300 px-3 py-2 text-green-600">🌪️ Gió</td>
              <td className="border border-gray-300 px-3 py-2 text-red-600">🔥 Lửa</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2">🌪️ Gió (Wind)</td>
              <td className="border border-gray-300 px-3 py-2 text-green-600">⚡ Sét</td>
              <td className="border border-gray-300 px-3 py-2 text-red-600">🏔️ Đất</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2">⚡ Sét (Thunder)</td>
              <td className="border border-gray-300 px-3 py-2 text-green-600">❄️ Băng</td>
              <td className="border border-gray-300 px-3 py-2 text-red-600">🌪️ Gió</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2">❄️ Băng (Frost)</td>
              <td className="border border-gray-300 px-3 py-2 text-green-600">🌊 Nước</td>
              <td className="border border-gray-300 px-3 py-2 text-red-600">⚡ Sét</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2">☀️ Ánh Sáng (Light)</td>
              <td className="border border-gray-300 px-3 py-2 text-green-600">🌑 Bóng Tối</td>
              <td className="border border-gray-300 px-3 py-2 text-red-600">🌑 Bóng Tối</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2">🌑 Bóng Tối (Dark)</td>
              <td className="border border-gray-300 px-3 py-2 text-green-600">☀️ Ánh Sáng</td>
              <td className="border border-gray-300 px-3 py-2 text-red-600">☀️ Ánh Sáng</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 text-gray-700">
          <p className="font-semibold">💡 Tóm tắt vòng tròn khắc chế:</p>
          <p>
            🌊 Nước <span className="text-green-600">{'>'}</span> 🔥 Lửa{' '}
            <span className="text-green-600">{'>'}</span> 🏔️ Đất{' '}
            <span className="text-green-600">{'>'}</span> 🌪️ Gió{' '}
            <span className="text-green-600">{'>'}</span> ⚡ Sét{' '}
            <span className="text-green-600">{'>'}</span> ❄️ Băng{' '}
            <span className="text-green-600">{'>'}</span> 🌊 Nước
          </p>
          <p>
            ☀️ Ánh Sáng <span className="text-blue-600">{'<>'}</span> 🌑 Bóng Tối{' '}
            <span className="text-gray-500">(khắc chế lẫn nhau)</span>
          </p>
        </div>
      </div>
    </>
  )
}

export default ElementInformation