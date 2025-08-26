import { useState, useEffect } from "react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "../Firebase";

const useMoodHistory=(uid)=>{
    const [moodHistory, setMoodHistory] = useState([]);
    const getMoodHistory=async()=>{
        try{
            const querySnapshot=await getDocs(query(collection(db,"userMoodTraking"), where("uid","==",uid)));
            const data=querySnapshot.docs.map((doc)=>({
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
        setMoodHistory(data);
      } catch (e) {
        
      }
    };

    
  useEffect(() => {
    if (!uid) {
      setMoodHistory([]);
      return;
    }
    getMoodHistory();
  }, [uid]);

  return moodHistory;
};

export default useMoodHistory;
