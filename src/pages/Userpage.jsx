import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Firebase";
import { useAuth } from "../context/Authcontext";

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
        <h1 className="text-red-800 text-2xl">History :</h1>

        {histories.length > 0 ? (
          histories.map((history) => <p key={history.id}>{history.score}</p>)
        ) : (
          <p>No history available</p>
        )}
      </div>
    </div>
  );
}

export default Userpage;
