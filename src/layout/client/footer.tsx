import React from "react";

const FooterClient = () => {
  return (
    <footer className="bg-white shadow-inner mt-auto py-6 text-center text-gray-600 border-t">
      <p className="text-sm">&copy; 2025 Client Dashboard. All rights reserved.</p>
      <p className="text-sm mt-2">
        Developed by Duong |{" "}
        <a href="mailto:support@example.com" className="text-yellow-600 hover:underline">
          Contact: support@example.com
        </a>
      </p>
    </footer>
  );
};

export default FooterClient;