import { Link, Outlet } from "react-router-dom";
import { FaChartLine, FaMusic, FaBook } from "react-icons/fa";

function MainContent() {
  return (
    <div className="flex-1 p-6 bg-gradient-to-b from-green-50 to-white min-h-screen">
      <div className="space-y-3 mb-6">
        <Link
          to="dailytips"
          className="flex items-center bg-white p-3 rounded-lg shadow hover:shadow-md hover:bg-green-100 transition w-full"
        >
          <FaBook className="text-xl text-green-600 mr-3" />
          <span className="text-sm font-medium text-green-800">Daily Tips</span>
        </Link>

        <Link
          to="mood"
          className="flex items-center bg-white p-3 rounded-lg shadow hover:shadow-md hover:bg-green-100 transition w-full"
        >
          <FaChartLine className="text-xl text-green-600 mr-3" />
          <span className="text-sm font-medium text-green-800">
            Mood Tracking
          </span>
        </Link>

        <div className="flex items-center bg-white p-3 rounded-lg shadow hover:shadow-md hover:bg-green-100 transition w-full">
          <FaMusic className="text-xl text-green-600 mr-3" />
          <span className="text-sm font-medium text-green-800">
            Calming Music
          </span>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MainContent;
