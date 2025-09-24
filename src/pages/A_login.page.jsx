import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sprout,
  User,
  Eye,
  EyeOff,
  LockIcon,
  Shield,
} from "lucide-react";

function AdminLogin() {
  //State variables for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //Hard coded login validation
    if (username === "admin" && password === "admin123") {
      navigate("/admin-dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  //Function to handle back to home page
  const navigate = useNavigate();

  //Function to handle back to home page
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    //main layout of the login card
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4 sm:p-6">
      <div className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header section with back arrow */}
        <div
          onClick={handleGoBack}
          className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Home Page</span>
        </div>
        {/* App icon and title */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-3 rounded-full bg-purple-100 text-purple-500">
            <Shield size={28} />
          </div>
          <h3 className="text-2xl font-bold text-purple-500">Admin's Login</h3>
          <p className="text-sm text-gray-500">
            Sign in to access your farm dashboard and manage your crops.
          </p>
        </div>
        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username input field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400" size={20} />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Password input field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="text-gray-400" size={20} />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            disabled={!username || !password}
            className={`w-full py-3 text-sm rounded-lg shadow-md transition-all duration-300
                 ${
                   !username || !password
                     ? "bg-gray-300 cursor-not-allowed"
                     : "bg-gradient-to-r from-purple-400 to-purple-500 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                 }`}
          >
            Sign In to Admin Dashboard
          </button>
        </form>
        {/* Information section */}
        <div className="p-4 border-2 border-purple-200 bg-purple-50 rounded-lg space-y-2">
          <div className="flex items-center space-x-2 text-purple-500">
            <Shield size={24} />
            <h2 className="font-semibold text-purple-500">
              Admin Account Access
            </h2>
          </div>
          <p className="text-sm text-purple-500">
            Admin access requires proper authentication. All administrative
            actions are logged for security purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
