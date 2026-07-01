import React, { useState } from "react";
import logo from "../assets/Lopy.jpeg";
import {useSelector} from 'react-redux'
import {
  Home,
  Search,
  Clapperboard,
  Send,
  Heart,
  SquarePlus,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { pagePath } from "../Router/pagePath";

const navItems = [
  { id: 1, name: "Home", icon: Home ,path:'/home'},
  { id: 2, name: "Search", icon: Search,path:'/search' },
  { id: 3, name: "Reels", icon: Clapperboard, path:`${pagePath.POSTS}` },
  { id: 4, name: "Messages", icon: Send,path:"/user/messages" },
  { id: 5, name: "Notifications", icon: Heart,},
  { id: 6, name: "Create", icon: SquarePlus, path:"/newpost"},
];
export default function Sidebar() {
  const { profile } = useSelector((state) => state.user);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden md:flex h-screen flex-col bg-white border-r border-zinc-200 w-20 xl:w-72">

        {/* Logo */}
        <Link
          to={pagePath.MAINHOME}
          className="h-20 flex items-center justify-center xl:justify-start px-4 xl:px-6"
        >
          <img src={logo} alt="Lopy" className="w-10 h-10 rounded-full object-cover" />
          <h1 className="hidden xl:block ml-3 text-xl font-bold">Lopy</h1>
        </Link>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`relative flex items-center justify-center xl:justify-start gap-4 w-full p-3 rounded-xl mb-2 transition-all ${
                  isActive(item.path)
                    ? "bg-zinc-100 shadow-md"
                    : "hover:bg-zinc-100"
                }`}
              >
                <Icon
                  size={24}
                  className={
                    isActive(item.path)
                      ? "text-black"
                      : "text-zinc-600"
                  }
                />

                <span
                  className={`hidden xl:block ${
                    isActive(item.path)
                      ? "font-semibold"
                      : "font-medium"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Profile */}
        <div className="border-t border-zinc-200 p-4">
          <Link
            to={pagePath.USERPROFILE}
            className="flex items-center gap-3 w-full rounded-xl p-2 hover:bg-zinc-100"
          >
            <img
              src={profile?.profilepic}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />

            <div className="hidden xl:block text-left">
              <h4 className="font-semibold text-sm">
                {profile?.username}
              </h4>
              <p className="text-xs text-zinc-500">
                View Profile
              </p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-zinc-200">
        <div className="flex items-center justify-around h-16">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`relative p-2 rounded-xl transition ${
                  isActive(item.path)
                    ? "bg-zinc-100 shadow-md"
                    : ""
                }`}
              >
                <Icon
                  size={24}
                  className={
                    isActive(item.path)
                      ? "text-black"
                      : "text-zinc-600"
                  }
                />
              </Link>
            );
          })}

          {/* Profile */}
          <Link to={pagePath.USERPROFILE}>
            <img
              src={profile?.profilepic}
              alt="profile"
              className="w-8 h-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
import { Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <Sidebar />

      <main className="flex-1 md:ml-64 overflow-x-hidden">
        <Outlet />
      </main>
    </>
  );
}