import React, { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <div className="w-full flex justify-center px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl"
      >
        <div className="relative">
          {/* Search Icon */}
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          {/* Input */}
          <input
            type="text"
            placeholder="Search users, posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-28 text-gray-700 shadow-md outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />

          {/* Button */}
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}