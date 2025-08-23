import { IconButton, Box, Button, Icon } from "@mui/material";
import { useState } from "react";
import {
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentNeutral,
  SentimentSatisfied,
  SentimentVerySatisfied,
} from "@mui/icons-material";

const moodColors = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF"];
const moodNames = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];

function MoodTracker() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="flex flex-col items-center space-y-4">
      <Box className="flex justify-between max-w-md w-full">
        {[
          SentimentVeryDissatisfied,
          SentimentDissatisfied,
          SentimentNeutral,
          SentimentSatisfied,
          SentimentVerySatisfied,
        ].map((Icon, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <IconButton onClick={() => setSelected(idx)}>
              <Icon></Icon>
            </IconButton>
            <span className="text-sm text-gray-700 mt-1">{moodNames[idx]}</span>
          </div>
        ))}
      </Box>
      <Button variant="contained" color="primary">
        Save
      </Button>
    </div>
  );
}

export default MoodTracker;
