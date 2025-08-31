import MoodTracker from "../components/MoodTracker";

function MoodPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-white px-6 py-12 flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-green-800 text-center">
        Mood Tracking
      </h2>
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6">
        <MoodTracker />
      </div>
    </div>
  );
}

export default MoodPage;
