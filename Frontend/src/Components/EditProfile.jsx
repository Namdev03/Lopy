import { useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../Services/axiosInstance";
import { userApiEndPoint } from "../Router/UserEndPoints";
import { pagePath } from "../Router/pagePath"; // change path if needed

export default function EditProfile() {
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const editProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("bio", bio);

      if (image) {
        formData.append("profilepic", image);
      }

      const response = await axiosInstance.post(
        userApiEndPoint.EDITPROFILE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      setBio("");
      setImage(null);
      setPreview(null);

      navigate(pagePath.USERPROFILE);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 h-36 relative">
          <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">
            <div className="relative">
              <img
                src={preview || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />

              <label className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700">
                ✎
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={editProfile}
          className="pt-24 pb-8 px-6 md:px-10 space-y-6"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-gray-500">
              Update your profile information.
            </p>
          </div>

          <div>
            <label className="font-semibold block mb-2">Bio</label>

            <textarea
              rows={5}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write your bio..."
              className="w-full rounded-xl border p-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Profile Picture
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm
              file:mr-4
              file:px-4
              file:py-2
              file:border-0
              file:rounded-lg
              file:bg-indigo-600
              file:text-white
              hover:file:bg-indigo-700"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}