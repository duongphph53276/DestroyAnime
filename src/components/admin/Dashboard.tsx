import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Iuser } from "../../interfaces/user"; // Đảm bảo đường dẫn đúng

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Dashboard = () => {
  const { darkMode } = useOutletContext<{ darkMode: boolean }>(); // Đồng bộ dark mode
  const [users, setUsers] = useState<Iuser[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu người dùng từ API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/users");
        setUsers(data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className={`text-center py-10 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Đang tải dữ liệu...
      </div>
    );
  }

  // Dữ liệu cho biểu đồ
  const roleData = {
    labels: ["Admin", "Client"],
    datasets: [
      {
        label: "Số lượng người dùng",
        data: [
          users.filter((user) => user.role === "admin").length,
          users.filter((user) => user.role === "client").length,
        ],
        backgroundColor: darkMode
          ? ["rgba(75, 192, 192, 0.6)", "rgba(255, 206, 86, 0.6)"]
          : ["rgba(54, 162, 235, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: darkMode
          ? ["rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)"]
          : ["rgba(54, 162, 235, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const lockData = {
    labels: ["Hoạt động", "Bị khóa"],
    datasets: [
      {
        data: [
          users.filter((user) => !user.isLocked).length,
          users.filter((user) => user.isLocked).length,
        ],
        backgroundColor: darkMode
          ? ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"]
          : ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: darkMode
          ? ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"]
          : ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Giả định dữ liệu đăng ký theo thời gian (có thể thay bằng dữ liệu thực từ API)
  const registrationData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"], // Giả lập
    datasets: [
      {
        label: "Người dùng mới",
        data: [10, 15, 20, 25, 30], // Giả lập
        fill: false,
        borderColor: darkMode ? "rgba(75, 192, 192, 1)" : "rgba(54, 162, 235, 1)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#ffffff" : "#000000", // Màu chữ legend
        },
      },
      title: {
        display: true,
        color: darkMode ? "#ffffff" : "#000000", // Màu chữ title
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#ffffff" : "#000000", // Màu chữ trục X
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", // Màu lưới
        },
      },
      y: {
        ticks: {
          color: darkMode ? "#ffffff" : "#000000", // Màu chữ trục Y
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)", // Màu lưới
        },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div
        className={`p-6 max-w-7xl mx-auto ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <h2
          className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"} mb-6`}
        >
          Dashboard Admin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Biểu đồ cột: Số lượng người dùng theo vai trò */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <Bar
              data={roleData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { ...chartOptions.plugins.title, text: "Người dùng theo vai trò" },
                },
              }}
            />
          </div>

          {/* Biểu đồ tròn: Tỷ lệ tài khoản khóa */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <Pie
              data={lockData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { ...chartOptions.plugins.title, text: "Trạng thái tài khoản" },
                },
              }}
            />
          </div>

          {/* Biểu đồ đường: Người dùng đăng ký theo thời gian */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <Line
              data={registrationData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { ...chartOptions.plugins.title, text: "Người dùng mới theo thời gian" },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;