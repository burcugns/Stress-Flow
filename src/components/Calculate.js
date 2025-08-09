
const optionScores = {
  "Not at all": 0,
  "A little": 1,
  "Somewhat": 2,
  "Quite a bit": 3,
  "Very much": 4,
};


function Calculate(responses,questions) {
  
    let total=0;

    questions.forEach((q, index) => {
    const step = index + 1;
    const answer = responses[step];
    if (!answer) return;
     let score = optionScores[answer];
    if (q.reverseScored) {
      score = 4 - score;
    }

    total += score;
  });

  return total;
}
export default Calculate;


