import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils/Utils";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
}, [])

  return (
    <div className="relative">
      <div className="inline-flex items-center overflow-hidden rounded-md border border-blue-600 ">
        <a
          href="#"
          className="border-e px-4 py-2 text-sm/none text-white hover:bg-gray-800 border-blue-600 "
        >
          Hello {loggedInUser}
        </a>

        <button
          onClick={toggleMenu}
          className="h-full p-2 text-gray-600 hover:bg-gray-800 hover:text-gray-700"
        >
          <span className="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-blue-600  shadow-lg"
          role="menu"
        >
          <div className="p-2">
            <a
              className="block rounded-lg px-4 py-2 text-sm text-white  "
              role="menuitem"
            >
              Settings
            </a>

            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-200"
              role="menuitem"
              onClick={handleLogout}
            >
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
                  stroke="#b91c1c"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
