import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';

function Header() {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  function handlelogout() {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('token');
    localStorage.removeItem('open-api-key');
    navigate('/');
    toast.success("Logout Successfully");
  }

  function handledata() {
    setIsClicked(!isClicked);
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Header */}
      <header className={`flex justify-between items-center px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md ${isClicked ? "relative z-50" : ""}`}>
        <h2 className="text-2xl font-bold">TaleTreats!</h2>
        <div onClick={handledata} className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      </header>

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white h-screen fixed top-0 left-0 pt-24 px-4 transition-transform duration-300 z-40">
        {/* New Story Button */}
        <div className="mb-6">
          <NavLink to="/ai" className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white font-medium gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 18 18">
              <path d="M8.25 9.75H3.75V8.25H8.25V3.75H9.75V8.25H14.25V9.75H9.75V14.25H8.25V9.75Z" />
            </svg>
            New Story
          </NavLink>
        </div>

        {/* Menu Section */}
        <nav>
          <div className="mb-6">
            <h3 className="text-sm font-semibold uppercase mb-3 text-gray-400">Menu</h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/ai-story" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                  📚 Manage Stories
                </NavLink>
              </li>
              <li>
                <NavLink to="/subscription" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                  💳 Manage Subscription
                </NavLink>
              </li>
              <li>
                <NavLink to="/static" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                  📊 Statistics
                </NavLink>
              </li>
            </ul>
          </div>

          {/* General Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase mb-3 text-gray-400">General</h3>
            <ul className="space-y-3">
              <li>
                <NavLink to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                  👤 Profile
                </NavLink>
              </li>
              <li>
                <button onClick={handlelogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
