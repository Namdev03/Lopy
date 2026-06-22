import React from "react";
import { Plus } from "lucide-react";

const stories = [
  {
    id: 1,
    username: "Your Story",
    image: "https://i.pravatar.cc/150?img=1",
    isOwn: true,
  },
  { id: 2, username: "johndoe", image: "https://i.pravatar.cc/150?img=2" },
  { id: 3, username: "sophia", image: "https://i.pravatar.cc/150?img=3" },
  { id: 4, username: "alex", image: "https://i.pravatar.cc/150?img=4" },
  { id: 5, username: "emma", image: "https://i.pravatar.cc/150?img=5" },
  { id: 6, username: "david", image: "https://i.pravatar.cc/150?img=6" },
  { id: 7, username: "olivia", image: "https://i.pravatar.cc/150?img=7" },
  { id: 8, username: "mason", image: "https://i.pravatar.cc/150?img=8" },
];

export default function StoryNavbar() {
  return (
    <section className="w-full bg-white border-b border-zinc-200">
      <div className="flex gap-2 px-3 py-3 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <button
            key={story.id}
            className="flex flex-col items-center gap-1 flex-shrink-0 group"
          >
            <div
              className={`relative p-[2px] rounded-full transition-transform duration-300 group-hover:scale-105 ${
                !story.isOwn
                  ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
                  : ""
              }`}
            >
              <div className="bg-white p-[2px] rounded-full">
                <img
                  src={story.image}
                  alt={story.username}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                />
              </div>

              {story.isOwn && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 border border-white rounded-full flex items-center justify-center">
                  <Plus size={10} className="text-white" />
                </div>
              )}
            </div>

            <span className="text-[10px] sm:text-[11px] text-zinc-700 max-w-[60px] truncate">
              {story.username}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}