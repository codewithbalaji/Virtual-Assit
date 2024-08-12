import { useEffect, useState } from "react";
import DropdownMenu from "../components/DropdownMenu";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-blue-600 dark:text-blue-600" href="#">
              <span className="text-3xl">Virtual Assit</span>
            </a>
          </div>

          <div className="max-sm:hidden">
            <nav aria-label="Global">
              <ul className="flex items-center gap-14 text-sm">
                <li>
                  <a
                    className="text-gray-500 text-lg transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#home"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 text-lg transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#features"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-500 text-lg transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                    href="#pricing"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {!loggedInUser ? (
                <>
                  <a
                    className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-blue-500"
                    href="/login"
                  >
                    Login
                  </a>

                  <div className="max-sm:hidden sm:flex">
                    <a
                      className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                      href="/signup"
                    >
                      Register
                    </a>
                  </div>
                </>
              ) : (
                <DropdownMenu />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
