import React from "react";
import Sidebar from "../Components/SideBar";
import StoryNavbar from "../Components/StoryNavbar";
import UserSuggestions from "../Components/Suggestion";

function MainHome() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Sidebar />

      <div className="flex justify-center">
        {/* Main Content Area */}
        <div className="flex w-full max-w-[1400px]">

          {/* Feed Section */}
          <main className="flex-1 md:ml-20 xl:ml-72 flex justify-center px-2 sm:px-4 lg:px-8">
            <div className="w-full max-w-[630px]">

              {/* Stories */}
              <div className="sticky top-0 z-30 bg-[#fafafa] pt-4 pb-2">
                <StoryNavbar />
              </div>

              {/* Feed */}
              <div className="space-y-6 pb-24 md:pb-8">

                <div className="bg-white rounded-xl border border-zinc-200 h-[500px] flex items-center justify-center">
                  <h2 className="text-zinc-500 font-medium">
                    Post Component
                  </h2>
                </div>

                <div className="bg-white rounded-xl border border-zinc-200 h-[500px] flex items-center justify-center">
                  <h2 className="text-zinc-500 font-medium">
                    Post Component
                  </h2>
                </div>

                <div className="bg-white rounded-xl border border-zinc-200 h-[500px] flex items-center justify-center">
                  <h2 className="text-zinc-500 font-medium">
                    Post Component
                  </h2>
                </div>

              </div>
            </div>
          </main>

          {/* Right Suggestions */}
          <aside className="hidden xl:block w-[320px] px-6 pt-8">
            <div className="sticky top-8">

              {/* Current User */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="profile"
                    className="w-14 h-14 rounded-full"
                  />

                  <div>
                    <h3 className="font-semibold text-sm">
                      johndoe
                    </h3>

                    <p className="text-sm text-zinc-500">
                      John Doe
                    </p>
                  </div>
                </div>

                <button className="text-blue-500 text-xs font-semibold hover:text-blue-700">
                  Switch
                </button>
              </div>

              <UserSuggestions />
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default MainHome;