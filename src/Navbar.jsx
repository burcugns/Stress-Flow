import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { useAuth } from "./context/Authcontext";
import { handleLogout } from "./functions/handleLogout";
import AudioPlayer from "./components/AudioPlayer";

function Navbar() {
  const navigation = [
    { name: "Home", href: "home" },
    { name: "Profile", href: "userpage" },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  return (
    <header className="bg-green-200 fixed top-0 inset-x-0 z-50 shadow-sm">
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-6 py-4 lg:px-8"
      >
        <div className="flex lg:flex-1 items-center gap-2">
          <Link to="/home" className="text-lg font-bold text-green-800">
            <FaLeaf className="text-green-500 text-2xl" />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-green-700 rounded-md hover:bg-green-100"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={`/${item.href}`}
              className="text-sm font-semibold text-green-700 hover:text-green-500 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          <AudioPlayer />
          {currentUser ? (
            <button
              onClick={() => handleLogout(navigate)}
              className="px-4 py-2 text-sm font-semibold text-green-700 hover:text-green-600 transition"
            >
              Log out
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-green-700 hover:text-green-500 transition"
              >
                Log in
              </Link>
            </>
          )}
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaLeaf className="text-green-500 text-2xl" />
              <span className="text-lg font-bold text-green-800">
                CalmSpace
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-green-700 rounded-md hover:bg-green-100"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={`/${item.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-semibold text-green-700 hover:bg-green-50 transition"
              >
                {item.name}
              </Link>
            ))}
            <AudioPlayer />
            {currentUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-base font-semibold text-green-700 hover:bg-green-50 transition"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-green-700 hover:bg-green-50 transition"
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Navbar;
