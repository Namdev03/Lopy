import React from "react";

const suggestions = [
  {
    id: 1,
    username: "johndoe",
    name: "John Doe",
    profile:
      "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 2,
    username: "sophia",
    name: "Sophia Miller",
    profile:
      "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 3,
    username: "alex",
    name: "Alex Johnson",
    profile:
      "https://i.pravatar.cc/150?img=13",
  },
  {
    id: 4,
    username: "emma",
    name: "Emma Wilson",
    profile:
      "https://i.pravatar.cc/150?img=14",
  },
  {
    id: 5,
    username: "david",
    name: "David Brown",
    profile:
      "https://i.pravatar.cc/150?img=15",
  },
];

export default function UserSuggestions() {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-500">
          Suggested for you
        </h2>

        <button className="text-xs font-semibold hover:text-zinc-500 transition">
          See All
        </button>
      </div>

      {/* Users */}
      <div className="space-y-4">
        {suggestions.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between"
          >
            {/* User Info */}
            <div className="flex items-center gap-3">
              <img
                src={user.profile}
                alt={user.username}
                className="w-11 h-11 rounded-full object-cover"
              />

              <div>
                <h3 className="text-sm font-semibold text-zinc-900">
                  {user.username}
                </h3>

                <p className="text-xs text-zinc-500">
                  {user.name}
                </p>
              </div>
            </div>

            {/* Follow Button */}
            <button className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}