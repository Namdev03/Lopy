import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import logo from "../assets/Lopy.jpeg";
import { pagePath } from '../Router/pagePath'
import { registerApi } from "../Services/userApiCollection";
import { userApiEndPoint } from "../Router/UserEndPoints";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 const submit = async(payload)=>{
  try {
    const response = await registerApi(payload);
    alert (response.message)
    console.log(response);    
  } catch (error) {
    alert (response.message)
  }
 }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        <div className="bg-white shadow-2xl rounded-2xl sm:rounded-3xl border border-gray-100 p-6 sm:p-8 md:p-10">

          {/* Logo */}
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-full  ">
              <img
                src={logo}
                alt="Lopy Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-gray-900">
              Welcome to Lopy
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(submit)}
            className="space-y-4 sm:space-y-5"
          >
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                className={`w-full px-4 py-3 text-sm sm:text-base rounded-xl border outline-none transition-all duration-200 ${errors.username
                  ? "border-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  }`}
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
              />

              {errors.username && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-3 text-sm sm:text-base rounded-xl border outline-none transition-all duration-200 ${errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className={`w-full px-4 py-3 text-sm sm:text-base rounded-xl border outline-none transition-all duration-200 ${errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Create Account
            </button>

            {/* Login */}
            <p className="text-center text-gray-500 text-sm sm:text-base">
              Already have an account?{" "}
              <Link
                to={pagePath.LOGIN}
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;