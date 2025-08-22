function DailyTipsPage() {
  const tips = [
    "Take a 5-minute break to breathe deeply.",
    "Drink water regularly.",
    "Stretch your body every hour.",
    "Write down one thing you are grateful for today.",
    "Listen to calming music for 10 minutes.",
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Daily Tips</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}

export default DailyTipsPage;
