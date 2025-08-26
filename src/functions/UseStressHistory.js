import { useState, useEffect } from "react";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import { db } from "../Firebase";


const useStressHistory=(uid)=>{
    const [stressHistory, setStressHistory] = useState([]);
    const getStressHistory=async()=>{
        try{
            const querySnapshot=await getDocs(query(collection(db,"userHistory"), where("uid","==",uid)));
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
        setStressHistory(data);
      } catch (e) {
        
      }
    };

    
  useEffect(() => {
    if (!uid) {
      setStressHistory([]);
      return;
    }
    getStressHistory();
  }, [uid]);

  return stressHistory;
};

export default useStressHistory;
