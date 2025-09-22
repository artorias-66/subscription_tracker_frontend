import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          SubDub
        </Link>
        <div className="hidden sm:flex items-center gap-6 text-gray-700">
          <Link to="/" className="hover:text-gray-900 transition">Home</Link>
          <Link to="/about" className="hover:text-gray-900 transition">About</Link>
          <Link to="/subscriptions" className="hover:text-gray-900 transition">Subscriptions</Link>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-600">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-black transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/sign-in" className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">Sign In</Link>
              <Link to="/sign-up" className="px-3 py-1.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
