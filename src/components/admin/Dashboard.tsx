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
import { Iuser } from "../../interfaces/user";

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
  const { darkMode } = useOutletContext<{ darkMode: boolean }>();
  const [users, setUsers] = useState<Iuser[]>([]);
  const [heroes, setHeroes] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, heroesResponse, monstersResponse] = await Promise.all([
          axios.get("http://localhost:3000/users"),
          axios.get("http://localhost:3000/heroes"),
          axios.get("http://localhost:3000/monsters"),
        ]);
        setUsers(usersResponse.data);
        setHeroes(heroesResponse.data);
        setMonsters(monstersResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={`text-center py-10 ${darkMode ? "text-white" : "text-gray-900"}`}>
        Đang tải dữ liệu...
      </div>
    );
  }

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

  const registrationData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Người dùng mới",
        data: [10, 15, 20, 25, 30],
        fill: false,
        borderColor: darkMode ? "rgba(75, 192, 192, 1)" : "rgba(54, 162, 235, 1)",
        tension: 0.1,
      },
    ],
  };

  const entityData = {
    labels: ["Heroes", "Monsters"],
    datasets: [
      {
        label: "Số lượng",
        data: [heroes.length, monsters.length],
        backgroundColor: darkMode
          ? ["rgba(153, 102, 255, 0.6)", "rgba(255, 159, 64, 0.6)"]
          : ["rgba(153, 102, 255, 0.6)", "rgba(255, 159, 64, 0.6)"],
        borderColor: darkMode
          ? ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"]
          : ["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Tắt tỷ lệ khung hình mặc định
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#ffffff" : "#000000",
        },
      },
      title: {
        display: true,
        color: darkMode ? "#ffffff" : "#000000",
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#ffffff" : "#000000",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        ticks: {
          color: darkMode ? "#ffffff" : "#000000",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          {/* Biểu đồ cột: Số lượng người dùng theo vai trò */}
          <div
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            style={{ minHeight: "300px", width: "100%" }}
          >
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
          <div
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            style={{ minHeight: "300px", width: "100%" }}
          >
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
          <div
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            style={{ minHeight: "300px", width: "100%" }}
          >
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

          {/* Biểu đồ cột: Tổng số Heroes và Monsters */}
          <div
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
            style={{ minHeight: "300px", width: "100%" }}
          >
            <Bar
              data={entityData}
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  title: { ...chartOptions.plugins.title, text: "Tổng số Heroes và Monsters" },
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