import React from "react";
import { Search } from "lucide-react";

export default function Message() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=11",
      lastMessage: "See you tomorrow 👋",
      time: "2 min",
      active: true,
    },
    {
      id: 2,
      name: "Emma Watson",
      avatar: "https://i.pravatar.cc/150?img=32",
      lastMessage: "Let's catch up!",
      time: "10 min",
      active: false,
    },
    {
      id: 3,
      name: "David Smith",
      avatar: "https://i.pravatar.cc/150?img=15",
      lastMessage: "Thanks ❤️",
      time: "1 hr",
      active: true,
    },
    {
      id: 4,
      name: "Sophia",
      avatar: "https://i.pravatar.cc/150?img=47",
      lastMessage: "Okay 👍",
      time: "Yesterday",
      active: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">

      {/* MASTER CONTAINER */}
      <div className="w-full bg-white min-h-screen pl-4 sm:pl-6 md:pl-10 lg:pl-16">

        {/* HEADER */}
        <div className="border-b py-4 px-4 sm:px-0">

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Messages
          </h1>

          {/* SEARCH */}
          <div className="mt-4 flex items-center bg-gray-100 py-3 px-3 sm:px-4 rounded-lg">
            <Search className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search users..."
              className="ml-3 w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* USERS LIST */}
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 sm:gap-4 border-b py-3 sm:py-4 px-3 sm:px-0 pr-4 hover:bg-gray-50 cursor-pointer transition"
            >

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full object-cover"
                />

                {user.active && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-white bg-green-500"></span>
                )}
              </div>

              {/* INFO */}
              <div className="flex-1 min-w-0">

                <div className="flex items-center justify-between gap-2">
                  <h2 className="truncate text-sm sm:text-base md:text-lg font-semibold text-gray-800">
                    {user.name}
                  </h2>

                  <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
                    {user.time}
                  </span>
                </div>

                <p className="mt-1 text-xs sm:text-sm text-gray-500 truncate">
                  {user.lastMessage}
                </p>
                 
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}