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
    <div className="bg-green-50 min-h-screen flex flex-col items-center p-4">
      <ul className="w-full max-w-md space-y-2">
        {songs.map((song, index) => (
          <li
            key={index}
            onClick={() => playSong(index)}
            className={`p-2 text-sm rounded cursor-pointer transition ${
              currentIndex === index
                ? "bg-green-600 text-white"
                : "bg-white border border-green-200 hover:bg-green-100"
            }`}
          >
            {song.title}
          </li>
        ))}
      </ul>
      <div className="fixed bottom-4 w-full max-w-md bg-green-700 text-white p-3 rounded flex items-center justify-between shadow-md">
        <p className="text-sm font-semibold">{songs[currentIndex].title}</p>
        <button
          onClick={togglePlay}
          className="p-2 bg-white text-green-700 rounded-full"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
      <audio
        ref={audioRef}
        src={songs[currentIndex].file}
        onEnded={() => setIsPlaying(false)}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default CalmingMusic;
