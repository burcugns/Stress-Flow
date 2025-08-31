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
  "bg-red-200", // Very Sad
  "bg-yellow-200", // Sad
  "bg-green-100", // Neutral
  "bg-green-300", // Happy
  "bg-green-500", // Very Happy
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
                  ${
                    selected === index
                      ? moodColors[index] + " shadow-lg"
                      : "bg-green-50"
                  }
                `}
                fontSize="large"
              />
            </IconButton>

            <span className="text-sm text-green-800 mt-1">
              {moodNames[index]}
            </span>
          </div>
        ))}
      </Box>
      <Button
        variant="contained"
        className={`bg-green-600 text-white hover:bg-green-500`}
        onClick={handleSaveMood}
        disabled={selected === null}
      >
        Save
      </Button>
    </div>
  );
}

export default MoodTracker;
