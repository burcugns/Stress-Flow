import { useState } from "react";
import useStressHistory from "../functions/UseStressHistory";
import useMoodHistory from "../functions/UseMoodHistory";

function Sidebar({ currentUser }) {
  const uid = currentUser && currentUser.uid;

  const stressHistory = useStressHistory(uid);
  const moodHistory = useMoodHistory(uid);

  const [showStressHistory, setShowStressHistory] = useState(false);
  const [showMoodHistory, setShowMoodHistory] = useState(false);
  const [showStressTestSummary, setStressTestSummary] = useState(false);

  let averageStress = 0;
  let highestStress = 0;
  let lowestStress = 0;

  if (stressHistory.length > 0) {
    let total = 0;
    highestStress = stressHistory[0].score;
    lowestStress = stressHistory[0].score;

    for (const h of stressHistory) {
      total += h.score;

      if (h.score > highestStress) highestStress = h.score;
      if (h.score < lowestStress) lowestStress = h.score;
    }

    averageStress = Math.round(total / stressHistory.length);
  }

  const moodLabel = (score) => {
    const labels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];
    return labels[score - 1];
  };

  return (
    <div className="w-64 bg-gradient-to-b from-green-50 to-white shadow-md p-4 rounded-xl">
      <h2 className="text-lg font-bold mb-4 text-green-800">
        {currentUser ? `Welcome ${currentUser.email}` : "No user"}
      </h2>

      {/* Stress Test History Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowStressHistory(!showStressHistory)}
          className="w-full flex justify-between items-center font-semibold mb-2 px-2 py-1 rounded hover:bg-green-100 text-green-700"
        >
          <span>Stress Test History</span>
          <span>{showStressHistory ? "▲" : "▼"}</span>
        </button>

        {showStressHistory && (
          <div className="pl-2">
            {stressHistory.length > 0 ? (
              stressHistory.map((h) => (
                <div
                  key={h.id}
                  className="border-b border-green-200 py-2 flex justify-between text-sm"
                >
                  <span className="text-green-700">{h.formattedDate}</span>
                  <span className="text-green-800 font-semibold">
                    {h.score}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-green-500 text-sm">No history available</p>
            )}
          </div>
        )}
      </div>

      {/* Stress Summary Section */}
      <div className="mb-6">
        <button
          onClick={() => setStressTestSummary(!showStressTestSummary)}
          className="w-full flex justify-between items-center font-semibold mb-2 px-2 py-1 rounded hover:bg-green-100 text-green-700"
        >
          <span>Stress Test Summary</span>
          <span>{showStressTestSummary ? "▲" : "▼"}</span>
        </button>

        {showStressTestSummary && (
          <div className="pl-2 text-sm space-y-2">
            {stressHistory.length > 0 ? (
              <>
                <div className="flex justify-between border-b border-green-200 py-1">
                  <span className="text-green-700">Average Stress</span>
                  <span className="text-green-800 font-semibold">
                    {averageStress}
                  </span>
                </div>
                <div className="flex justify-between border-b border-green-200 py-1">
                  <span className="text-green-700">Highest</span>
                  <span className="text-red-600 font-semibold">
                    {highestStress}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-green-700">Lowest</span>
                  <span className="text-green-600 font-semibold">
                    {lowestStress}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-green-500">No summary available</p>
            )}
          </div>
        )}
      </div>

      {/* Mood Tracking Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowMoodHistory(!showMoodHistory)}
          className="w-full flex justify-between items-center font-semibold mb-2 px-2 py-1 rounded hover:bg-green-100 text-green-700"
        >
          <span>Mood Tracking History</span>
          <span>{showMoodHistory ? "▲" : "▼"}</span>
        </button>

        {showMoodHistory && (
          <div className="pl-2">
            {moodHistory.length > 0 ? (
              moodHistory.map((mood) => (
                <div
                  key={mood.id}
                  className="border-b border-green-200 py-2 flex justify-between text-sm"
                >
                  <span className="text-green-700">{mood.formattedDate}</span>
                  <span className="text-green-600 font-semibold">
                    {moodLabel(mood.score)}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-green-500 text-sm">
                No mood history available
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
