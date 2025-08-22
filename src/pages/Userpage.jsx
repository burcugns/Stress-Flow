import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { useAuth } from "../context/Authcontext";
import { Timestamp } from "firebase/firestore";

function Userpage() {
  const { currentUser } = useAuth();
  const [histories, setHistories] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

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

        {/* History Section */}
        <div>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full flex justify-between items-center font-semibold mb-2 px-2 py-1 hover:bg-gray-200 rounded"
          >
            <span>History</span>
            <span>{showHistory ? "▲" : "▼"}</span>
          </button>

          {showHistory && (
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
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <p className="text-gray-600">{/* Content will be added later  */}</p>
      </div>
    </div>
  );
}

export default Userpage;
