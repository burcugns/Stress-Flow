import firstpageimage from "../image/meditation.png";
import { FaSpa, FaChartLine, FaMusic, FaBook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { handleLogout } from "../functions/handleLogout";

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* image */}
      <div className="flex flex-col items-center">
        <img
          src={firstpageimage}
          alt="Meditation"
          className="w-72 h-auto object-contain"
        />
      </div>

      {/* headline */}
      <h1 className="mt-8 text-3xl sm:text-4xl font-bold text-center text-gray-800">
        Your personal space for stress relief and mental wellbeing
      </h1>
      <p className="mt-3 text-lg text-center text-gray-600">
        Start your journey to a calmer mind.
      </p>

      {/* buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/survey"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition"
        >
          Get Started
        </Link>

        {currentUser ? (
          <button
            onClick={() => handleLogout(navigate)}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* Features */}
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <FaSpa className="text-3xl text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-700">
            Guided Meditations
          </span>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <FaChartLine className="text-3xl text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-700">
            Mood Tracking
          </span>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <FaMusic className="text-3xl text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-700">
            Calming Music
          </span>
        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <FaBook className="text-3xl text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-700">
            Wellbeing Tips
          </span>
        </div>
      </div>
    </div>
  );
}
