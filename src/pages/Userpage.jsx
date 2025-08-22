import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { useAuth } from "../context/Authcontext";
import { Timestamp } from "firebase/firestore";
import { FaChartLine, FaMusic, FaBook } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

function Userpage() {
  const { currentUser } = useAuth();
  const [histories, setHistories] = useState([]);
  const [showStressHistory, setShowStressHistory] = useState(false);
  const [showMoodHistory, setShowMoodHistory] = useState(false);

  useEffect(() => {
    if (currentUser) {
      displayHistory(currentUser.uid);
    } else {
      setHistories([]);
    }
  }, [currentUser]);

  const displayHistory = async (uid) => {
    try {
      const q = query(collection(db, "userHistory"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const historyList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        formattedDate:
          doc.data().date instanceof Timestamp
            ? doc.data().date.toDate().toLocaleString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "No date",
      }));

      setHistories(historyList);
    } catch (e) {}
  };

  return (
    <div className="flex min-h-screen pt-20">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">
          {currentUser ? `Welcome ${currentUser.email}` : "No user"}
        </h2>

        {/* Stress Test History Section */}
        <div>
          <button
            onClick={() => setShowStressHistory(!showStressHistory)}
            className="w-full flex justify-between items-center font-semibold mb-2 px-2 py-1 hover:bg-gray-200 rounded"
          >
            <span>Stress Test History</span>
            <span>{showStressHistory ? "▲" : "▼"}</span>
          </button>

          {showStressHistory && (
            <div className="pl-2">
              {histories.length > 0 ? (
                histories.map((history) => (
                  <div
                    key={history.id}
                    className="border-b border-gray-200 py-2 flex justify-between text-sm"
                  >
                    <span className="text-gray-600">
                      {history.formattedDate}
                    </span>
                    <span className="text-blue-700 font-semibold">
                      {history.score}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No history available</p>
              )}
            </div>
          )}
        </div>

        {/* Stress Summary */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Stress Test Summary</h3>
          <p className="text-sm text-gray-600">
            Average Stress:{" "}
            {histories.length > 0
              ? Math.round(
                  histories.reduce((sum, h) => sum + h.score, 0) /
                    histories.length
                )
              : "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            Highest:{" "}
            {histories.length > 0
              ? Math.max(...histories.map((h) => h.score))
              : "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            Lowest:{" "}
            {histories.length > 0
              ? Math.min(...histories.map((h) => h.score))
              : "N/A"}
          </p>
        </div>

        {/* Mood Tracking History  */}
        <div className="mt-6">
          <button
            onClick={() => setShowMoodHistory(!showMoodHistory)}
            className="w-full flex justify-between items-center font-semibold mb-2 px-2 py-1 hover:bg-gray-200 rounded"
          >
            <span>Mood Tracking History</span>
            <span>{showMoodHistory ? "▲" : "▼"}</span>
          </button>

          {showMoodHistory && (
            <div className="pl-2">
              <p className="text-gray-500 text-sm">No mood history yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="space-y-3 mb-6">
          <Link
            to="dailytips"
            className="flex items-center bg-white p-3 rounded-lg shadow hover:shadow-md transition w-full"
          >
            <FaBook className="text-xl text-blue-500 mr-3" />
            <span className="text-sm font-medium text-gray-700">
              Daily Tips
            </span>
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
    </div>
  );
}
export default Userpage;
