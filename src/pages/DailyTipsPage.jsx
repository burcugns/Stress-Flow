function DailyTipsPage() {
  const tips = [
    "Take a 5-minute break to breathe deeply.",
    "Drink water regularly.",
    "Stretch your body every hour.",
    "Write down one thing you are grateful for today.",
    "Listen to calming music for 10 minutes.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-6 py-12 flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-green-800 text-center">
        Daily Tips
      </h2>
      <ul className="list-disc list-inside space-y-3 max-w-2xl text-green-800 bg-white p-6 rounded-xl shadow-md">
        {tips.map((tip, idx) => (
          <li key={idx} className="py-1">
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DailyTipsPage;
