import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { getAuth } from "firebase/auth";

function Userpage() {
  const [histories, setHistories] = useState([]);
  const [useremail, setUserEmail] = useState("");

  const getUserEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email);
    } else {
      setUserEmail("");
    }
  };

  const displayHistory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "userHistory"));
      const historyList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistories(historyList);
    } catch (e) {}
  };

  useEffect(() => {
    getUserEmail();
    displayHistory();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div>
        <h2 className="text-blue-500">User Email: {useremail}</h2>
      </div>
      <div>
        <h1 className="text-green-500 text-3xl">History :</h1>
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
