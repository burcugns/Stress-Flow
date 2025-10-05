import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import audio1 from "../music/audio1.mp3";
import audio2 from "../music/audio2.mp3";
import audio3 from "../music/audio3.mp3";
import audio4 from "../music/audio4.mp3";
import audio5 from "../music/audio5.mp3";
import audio6 from "../music/audio6.mp3";

function CalmingMusic() {
  const songs = [
    { title: "Meditation 1", file: audio1 },
    { title: "Meditation 2", file: audio2 },
    { title: "Meditation 3", file: audio3 },
    { title: "Meditation 4", file: audio4 },
    { title: "Meditation 5", file: audio5 },
    { title: "Meditation 6", file: audio6 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const playSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    setTimeout(() => audioRef.current.play(), 100);
  };
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in-up">
          <h1 className="text-4xl font-bold text-green-800 mb-4">🎵 Calming Music</h1>
          <p className="text-lg text-green-700">Relax and unwind with our curated collection of meditation tracks</p>
        </div>

        {/* Music Library */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {songs.map((song, index) => (
            <div
              key={index}
              onClick={() => playSong(index)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                currentIndex === index
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-xl scale-105"
                  : "bg-white border-2 border-green-200 hover:bg-green-50 hover:border-green-300 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    currentIndex === index ? "bg-white bg-opacity-20" : "bg-green-100"
                  }`}>
                    <span className="text-2xl">
                      {currentIndex === index && isPlaying ? "🎵" : "🎶"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{song.title}</h3>
                    <p className="text-sm opacity-75">Meditation Track</p>
                  </div>
                </div>
                {currentIndex === index && (
                  <div className="text-2xl">
                    {isPlaying ? "⏸️" : "▶️"}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Now Playing Card */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-4 fade-in-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">
                  {isPlaying ? "🎵" : "🎶"}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-green-800 text-lg">{songs[currentIndex].title}</h3>
                <p className="text-green-600 text-sm">Now Playing</p>
              </div>
            </div>
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full flex items-center justify-center hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>
          
          {/* Progress bar placeholder */}
          <div className="mt-4">
            <div className="w-full bg-green-200 h-1 rounded-full">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-1 rounded-full w-1/3"></div>
            </div>
          </div>
        </div>

        {/* Audio element */}
        <audio
          ref={audioRef}
          src={songs[currentIndex].file}
          onEnded={() => setIsPlaying(false)}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}

export default CalmingMusic;
