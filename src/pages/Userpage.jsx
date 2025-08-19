import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { useAuth } from "../context/Authcontext";
import { Timestamp } from "firebase/firestore";

function Userpage() {
  const { currentUser } = useAuth();
  const [histories, setHistories] = useState([]);

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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div>
        <h2 className="text-shadow-red-700 text-2xl ">
          {currentUser ? `Welcome  ${currentUser.email} ` : "No user"}
        </h2>
      </div>
      <div>
        {histories.length > 0 ? (
          histories.map((history) => (
            <div
              key={history.id}
              className="border-b border-gray-200 py-2 flex justify-between text-sm"
            >
              <span className="text-gray-600">{history.formattedDate}</span>
              <span className="text-blue-700 font-semibold">
                {history.score}
              </span>
            </div>
          ))
        ) : (
          <p>No history available</p>
        )}
      </div>
    </div>
  );
}

export default Userpage;
