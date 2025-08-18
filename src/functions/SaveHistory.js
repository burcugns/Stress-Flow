import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";


const saveHistory = async (userScore) => {
  try {
    const docRef = await addDoc(collection(db, "userHistory"), {
      uid: getAuth().currentUser.uid,
      email:getAuth().currentUser.email,
      score: userScore,
      date: new Date(),
    });
  } catch (e) {
  }
};

export default saveHistory;
