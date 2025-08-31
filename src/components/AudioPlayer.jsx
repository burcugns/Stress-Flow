import { useRef, useState } from "react";
import { IoStopCircleSharp } from "react-icons/io5";
import { FaRegPlayCircle } from "react-icons/fa";
import audio1 from "../music/audio1.mp3";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={handleAudio}>
        {isPlaying ? (
          <IoStopCircleSharp size={30} className="text-green-800" />
        ) : (
          <FaRegPlayCircle size={30} className="text-green-800" />
        )}
      </button>
      <audio ref={audioRef} src={audio1} />
    </div>
  );
}
