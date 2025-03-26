import React from "react";

const FooterClient = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 to-gray-800 shadow-inner mt-auto py-6 text-center text-gray-400 border-t border-gray-700">
      <p className="text-sm">&copy; 2025 Anime War. All rights reserved.</p>
      <p className="text-sm mt-2">
        Developed by Duong |{" "}
        <a href="mailto:support@example.com" className="text-yellow-400 hover:text-yellow-300 transition">
          Contact: support@example.com
        </a>
      </p>
    </footer>
  );
};

export default FooterClient;