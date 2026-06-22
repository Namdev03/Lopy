import React from "react";
import StoryNavbar from "../Components/StoryNavbar";
import UserSuggestions from "../Components/Suggestion";

function MainHome() {
  const posts = [1, 2, 3];

  return (
    <div className="min-h-screen bg-zinc-50"> <div className="max-w-[1200px] mx-auto px-3 sm:px-4 lg:px-6"> <div className="flex justify-center gap-8">
      <div className="min-h-screen bg-zinc-50">
        <div className="max-w-[1100px] mx-auto px-3 sm:px-4">
          <div className="flex justify-start gap-35">

        
            {/* Feed */}
            <main className="flex-1 max-w-[600px]">
              <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-zinc-200">
                <StoryNavbar />
              </div>
              <div className="py-5 space-y-5">
                {posts.map((post) => (
                  <div
                    key={post} className="  bg-white border   border-zinc-200 rounded-2xl min-h-[500px] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-center h-[500px] text-zinc-500">
                      Post {post}
                    </div>
                  </div>
                ))}
              </div>
            </main>

            {/* Suggestions */}
            <aside className="hidden xl:block w-[280px] shrink-0 pt-6">
              <div className="sticky top-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/150?img=12"
                      alt="Profile"
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="text-sm font-semibold">johndoe</h3>
                      <p className="text-sm text-zinc-500">John Doe</p>
                    </div>
                  </div>

                  <button className="text-xs font-semibold text-blue-500 hover:text-blue-600">
                    Switch
                  </button>
                </div>

                <UserSuggestions />
              </div>
            </aside>

          </div>

        </div>
      </div>

    </div>
    </div>
    </div>
  );
}

export default MainHome;
