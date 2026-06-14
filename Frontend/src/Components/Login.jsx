import React from "react";
import { useForm } from "react-hook-form";
import { pagePath } from "../Router/pagePath";
import { Link, Navigate, useNavigate } from "react-router";
import { loginApi } from "../Services/userApiCollection";
import { loginUserAsync } from "../Redux/userSlice";
import {useDispatch} from 'react-redux'
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
const dispatch = useDispatch();
const navigate = useNavigate();
const submit = async (payload) => {
  try {
    const response = await dispatch(loginUserAsync(payload)).unwrap();
    alert(response.message);
    if(response.status ==true){
      navigate(pagePath.MAINHOME)
    }
    else{
      navigate(pagePath.LOGIN)
    }
  } catch (error) {
    alert(error.message || "Login failed");
  }
};
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-500">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(submit)}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={`w-full rounded-xl border px-4 py-3 sm:py-3.5 text-sm sm:text-base outline-none transition-all duration-200 ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </button>
              </div>

              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full rounded-xl border px-4 py-3 sm:py-3.5 text-sm sm:text-base outline-none transition-all duration-200 ${
                  errors.password
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-slate-600"
              >
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-blue-600 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm sm:text-base text-slate-500">
            Don't have an account?{" "}
            <Link
              to={pagePath.SIGNUP}
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <p className="mt-5 text-center text-xs sm:text-sm text-slate-400">
          Secure authentication powered by industry-standard encryption.
        </p>
      </div>
    </div>
  );
}