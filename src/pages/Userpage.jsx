import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

function Userpage() {
  const [histories, setHistories] = useState([]);
  const [email, setEmail] = useState("");

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
    displayHistory();
    getEmailFromSession();
  }, []);

  const getEmailFromSession = () => {
    const email = localStorage.getItem("email");
    setEmail(email);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div>
        <h2 className="text-blue-500">User Email:{email} </h2>
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
