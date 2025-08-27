import { IconButton, Box, Button } from "@mui/material";
import { useState } from "react";
import saveMoodHistory from "../functions/SaveMood";

import {
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVerySatisfied,
} from "@mui/icons-material";

const moodColors = [
  "bg-[#FFADAD]",
  "bg-[#FFD6A5]",
  "bg-[#FDFFB6]",
  "bg-[#CAFFBF]",
  "bg-[#9BF6FF]",
];
const moodNames = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];

function MoodTracker() {
  const [selected, setSelected] = useState(null);

  const handleSaveMood = () => {
    if (selected !== null) {
      saveMoodHistory(selected + 1);
      setSelected(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Box className="flex justify-between max-w-md w-full">
        {[
          SentimentVeryDissatisfied,
          SentimentDissatisfied,
          SentimentNeutral,
          SentimentSatisfied,
          SentimentVerySatisfied,
        ].map((IconComponent, index) => (
          <div key={index} className="flex flex-col items-center">
            <IconButton onClick={() => setSelected(index)}>
              <IconComponent
                className={`rounded-full transition duration-300 mx-2 shadow-md 
  ${selected === index ? moodColors[index] + " shadow-lg" : "bg-gray-200"}
`}
              />
            </IconButton>

            <span className="text-sm text-blue-950 mt-1">
              {moodNames[index]}
            </span>
          </div>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveMood}
        disabled={selected === null}
      >
        Save
      </Button>
    </div>
  );
}

export default MoodTracker;
