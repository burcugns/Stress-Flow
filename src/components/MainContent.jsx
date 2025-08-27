import { Link, Outlet } from "react-router-dom";
import { FaChartLine, FaMusic, FaBook } from "react-icons/fa";

function MainContent() {
  return (
    <div className="flex-1 p-6">
      <div className="space-y-3 mb-6">
        <Link
          to="dailytips"
          className="flex items-center bg-white p-3 rounded-lg shadow hover:shadow-md transition w-full"
        >
          <FaBook className="text-xl text-blue-500 mr-3" />
          <span className="text-sm font-medium text-gray-700">Daily Tips</span>
        </Link>

        <Link
          to="mood"
          className="flex items-center bg-white p-3 rounded-lg shadow hover:shadow-md transition w-full"
        >
          <FaChartLine className="text-xl text-blue-500 mr-3" />
          <span className="text-sm font-medium text-gray-700">
            Mood Tracking
          </span>
        </Link>

        <div className="flex items-center bg-white p-3 rounded-lg shadow hover:shadow-md transition w-full">
          <FaMusic className="text-xl text-blue-500 mr-3" />
          <span className="text-sm font-medium text-gray-700">
            Calming Music
          </span>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MainContent;
