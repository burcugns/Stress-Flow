import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";


const saveMoodHistory = async (userMoodScore) => {
  try {
    const docRef = await addDoc(collection(db, "userMoodTraking"), {
      uid: getAuth().currentUser.uid,
      email:getAuth().currentUser.email,
      score: userMoodScore,
      date: new Date(),
    });
  } catch (e) {
  }
};

export default saveMoodHistory;