import React, { useState } from "react";
import logo from "../assets/Lopy.jpeg";
import {
  Home,
  Search,
  Clapperboard,
  Send,
  Heart,
  SquarePlus,
} from "lucide-react";

const navItems = [
  { id: 1, name: "Home", icon: Home },
  { id: 2, name: "Search", icon: Search },
  { id: 3, name: "Reels", icon: Clapperboard },
  { id: 4, name: "Messages", icon: Send, badge: 7 },
  { id: 5, name: "Notifications", icon: Heart, badge: 12 },
  { id: 6, name: "Create", icon: SquarePlus },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(1);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden md:flex h-screen flex-col bg-white border-r border-zinc-200 w-20 xl:w-72">
        {/* Logo */}
        <div className="h-20 flex items-center justify-center xl:justify-start px-4 xl:px-6">
          <img src={logo} alt="Lopy" className="w-10 h-10 rounded-full object-cover" />

          <h1 className="hidden xl:block ml-3 text-xl font-bold">
            Lopy
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`relative flex items-center justify-center xl:justify-start gap-4 w-full p-3 rounded-xl mb-2 transition-all ${
                  activeItem === item.id
                    ? "bg-zinc-100 shadow-md"
                    : "hover:bg-zinc-100"
                }`}
              >
                <div className="relative">
                  <Icon
                    size={24}
                    className={
                      activeItem === item.id
                        ? "text-black"
                        : "text-zinc-600"
                    }
                  />

                  {item.badge && (
                    <span className="absolute -right-2 -top-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span
                  className={`hidden xl:block ${
                    activeItem === item.id
                      ? "font-semibold"
                      : "font-medium"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="border-t border-zinc-200 p-4">
          <button className="flex items-center gap-3 w-full rounded-xl p-2 hover:bg-zinc-100">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />

            <div className="hidden xl:block text-left">
              <h4 className="font-semibold text-sm">johndoe</h4>
              <p className="text-xs text-zinc-500">View Profile</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-zinc-200">
        <div className="flex items-center justify-around h-16">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`relative p-2 rounded-xl transition ${
                  activeItem === item.id
                    ? "bg-zinc-100 shadow-md"
                    : ""
                }`}
              >
                <Icon
                  size={24}
                  className={
                    activeItem === item.id
                      ? "text-black"
                      : "text-zinc-600"
                  }
                />

                {item.badge && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className={`w-8 h-8 rounded-full cursor-pointer transition ${
              activeItem === 99
                ? "ring-2 ring-black"
                : ""
            }`}
            onClick={() => setActiveItem(99)}
          />
        </div>
      </div>
    </>
  );
}