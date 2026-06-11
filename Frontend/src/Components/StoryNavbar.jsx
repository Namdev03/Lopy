import React from "react";
import { Plus } from "lucide-react";

const stories = [
  {
    id: 1,
    username: "Your Story",
    image: "https://i.pravatar.cc/150?img=1",
    isOwn: true,
  },
  {
    id: 2,
    username: "johndoe",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    username: "sophia",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    username: "alex",
    image: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    username: "emma",
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    username: "david",
    image: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 7,
    username: "olivia",
    image: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 8,
    username: "mason",
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 9,
    username: "charlotte",
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 10,
    username: "ethan",
    image: "https://i.pravatar.cc/150?img=10",
  },
];

export default function StoryNavbar() {
  return (
    <div className="w-full bg-white border-b border-zinc-200 overflow-hidden">
      <div className="story-track flex items-start gap-4 px-4 py-4">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div
              className={`relative rounded-full p-[2px] transition-transform duration-300 group-hover:scale-105 ${
                !story.isOwn
                  ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
                  : ""
              }`}
            >
              <div className="bg-white rounded-full p-[2px]">
                <img
                  src={story.image}
                  alt={story.username}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                />
              </div>

              {story.isOwn && (
                <div className="absolute bottom-0 right-0 bg-blue-500 border-2 border-white rounded-full p-1">
                  <Plus size={12} className="text-white" />
                </div>
              )}
            </div>

            <span className="text-[11px] sm:text-xs text-zinc-700 max-w-[70px] truncate">
              {story.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}