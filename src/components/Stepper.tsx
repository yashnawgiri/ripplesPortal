import { useState } from "react";
import "../styles/home/stepper.css";
import { TiTick } from "react-icons/ti";

interface StepperProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, setCurrentStep }) => {
  const steps = ["Basic Info", "Schedule Demo"];
  const [complete, setComplete] = useState(false);

  return (
    <>
      <div className="flex justify-between">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-color">{step}</p>
          </div>
        ))}
      </div>
      {!complete && (
        <button
          aria-label={
            currentStep === steps.length ? "Finish setup" : "Next step"
          }
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev: number) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default Stepper;
