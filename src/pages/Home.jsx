import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { handleLogout } from "../functions/handleLogout";
import homeimage from "../image/wellbeing.png";

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-green-100 to-white min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="flex flex-col items-center">
        <img
          src={homeimage}
          alt="Meditation"
          className="w-72 h-72 rounded-full object-cover object-right"
        />
      </div>

      <h1 className="mt-8 text-3xl sm:text-4xl font-bold text-center text-green-800">
        Your personal space for stress relief and mental wellbeing
      </h1>
      <p className="mt-3 text-lg text-center text-green-700">
        Start your journey to a calmer mind.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          to="/survey"
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500 transition"
        >
          🧘‍♀️ Get Started
        </Link>

        {currentUser ? (
          <button
            onClick={() => handleLogout(navigate)}
            className="px-6 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-600 transition"
          >
            🔓 Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-6 py-3 bg-white border border-green-300 text-green-700 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            🔐 Login
          </Link>
        )}
      </div>
    </div>
  );
}
