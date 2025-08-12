import { useEffect } from "react";
import Calculate from "../functions/Calculate";
import saveHistory from "../functions/SaveHistory";

function Result({ responses, questions }) {
  const score = Calculate(responses, questions);

  useEffect(() => {
    saveHistory(score);
  }, [score]);

  let stressLevel = "";
  let adviceList = [];
  let adviceEmojis = [];

  if (score <= 13) {
    stressLevel = "Low Stress";
    adviceList = [
      "Keep up your good habits.",
      "Maintain a balanced lifestyle.",
      "Take regular breaks during your work.",
      "Spend time outdoors and enjoy fresh air.",
      "Stay connected with friends and family.",
    ];
    adviceEmojis = ["👍", "⚖️", "☕️", "🌳", "🤝"];
  } else if (score <= 26) {
    stressLevel = "Moderate Stress";
    adviceList = [
      "Go for a 10-minute walk.",
      "Make yourself a cup of coffee.",
      "Listen to your favorite music without distractions.",
      "Practice deep breathing exercises.",
      "Try mindfulness or meditation for a few minutes.",
    ];
    adviceEmojis = ["🚶‍♂️", "☕️", "🎧", "💨", "🧘‍♀️"];
  } else {
    stressLevel = "High Stress";
    adviceList = [
      "Practice relaxation techniques like yoga or meditation.",
      "Take a calm walk in nature.",
      "Prepare a warm drink and focus on your breath.",
      "Limit screen time and social media.",
      "Consider talking to a professional for support.",
    ];
    adviceEmojis = ["🧘‍♂️", "🌿", "🍵", "📵", "🗣️"];
  }

  const levelColors = {
    "Low Stress": "text-green-600 bg-green-100",
    "Moderate Stress": "text-yellow-700 bg-yellow-100",
    "High Stress": "text-red-700 bg-red-100",
  };

  return (
    <div className="max-w-md mx-auto mt-20 mb-20 bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Survey Result
      </h2>

      <div className="text-center mb-8">
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold">Your score:</span> {score}
        </p>
        <p
          className={`inline-block px-4 py-2 rounded-full font-semibold text-lg ${levelColors[stressLevel]}`}
        >
          {stressLevel}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          Advice for You
        </h3>
        <ul className="space-y-3">
          {adviceList.map((advice, index) => (
            <li
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center space-x-3"
            >
              <span className="text-2xl">{adviceEmojis[index]}</span>
              <span>{advice}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Result;
