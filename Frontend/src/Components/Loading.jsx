import React from "react";

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

        <h2 className="text-lg font-semibold text-gray-700">
          Loading...
        </h2>
      </div>
    </div>
  );
}

export default Loading;