import React, { useState } from "react";
import Result from "../components/Result";

const sharedOptions = [
  "Not at all",
  "A little",
  "Somewhat",
  "Quite a bit",
  "Very much",
];

const surveyData = [
  {
    question: "How often have you felt unable to stop worrying about things?",
  },
  {
    question:
      "How often did you find that you couldn’t cope with everything you had to do?",
  },
  {
    question: "How often have you felt that you were on top of things?",
    reverseScored: true,
  },
  {
    question: "How often did you feel nervous and “stressed”?",
  },
  {
    question:
      "How often have you felt confident about your ability to handle personal problems?",
    reverseScored: true,
  },
  {
    question: "How often have you felt that things were going your way?",
    reverseScored: true,
  },
  {
    question:
      "How often felt difficulties were piling up so high that you could not overcome them?",
  },
  {
    question:
      "How often have you been upset because of something that happened unexpectedly?",
  },
  {
    question:
      "How often did you feel that you were effectively coping with important changes happening in your life?",
    reverseScored: true,
  },
  {
    question:
      "How often have you felt that you weren’t able to control the important things in your life?",
  },
];

export default function Survey() {
  const totalSteps = surveyData.length;
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState({});
  const [showResult, setShowResult] = useState(false);

  const currentSurvey = surveyData[currentStep - 1];
  const selected = responses[currentStep] ?? "";

  const handleOptionClick = (option) => {
    setResponses((prev) => ({
      ...prev,
      [currentStep]: option,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      {showResult ? (
        <Result responses={responses} questions={surveyData} />
      ) : (
        <div className="max-w-lg w-full bg-white rounded-xl shadow-md p-6 pt-12 space-y-8">
          <div className="text-sm text-gray-500 text-center font-medium">
            {currentStep} / {totalSteps}
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-900">
            {currentSurvey.question}
          </h2>
          <div className="grid grid-cols-1 gap-4 mt-6">
            {sharedOptions.map((option) => (
              <button
                key={option}
                className={`border rounded-lg px-4 py-2 text-sm font-medium transition ${
                  selected === option
                    ? "bg-blue-600 text-white border-blue-600"
                    : "text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-6">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-6 mb-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
              disabled={currentStep === 1}
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={!selected}
            >
              {currentStep === totalSteps ? "Finish →" : "Next →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
