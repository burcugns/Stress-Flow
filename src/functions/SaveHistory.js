const saveHistory = async (userScore) => {
  try {
    const docRef = await addDoc(collection(db, "userHistory"), {
      id: getAuth().currentUser.uid,
      score: userScore,
      date: new Date(),
    });
  } catch (e) {
  }
};

export default saveHistory;
