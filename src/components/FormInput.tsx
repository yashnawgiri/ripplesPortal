import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";

import { checkValueByType, toCamelCase } from "../utils/utils";

import CustomButton from "./CustomElements/CustomButton";

import { siteConfig } from "@/config/site";

interface ValuesType {
  [key: string]: string; // Define values as an object with string keys and string values
}

interface FormInputProps {
  setValue: (key: string, value: string) => void; // A function that updates a value by key
  values: ValuesType; // Values type is a key-value pair object
  setCurrentStep: (stepUpdater: (prev: number) => number) => void; // Function to update the step
}

const FormInput: React.FC<FormInputProps> = ({
  values,
  setValue,
  setCurrentStep,
}) => {
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState(false);

  const onFormSubmit = async () => {
    setError("");
    let err = false;
    const data = new FormData();

    Object.keys(values).forEach((key) => {
      if (checkValueByType(toCamelCase(key), values[key])) {
        data.append(key, values[key]);
      } else {
        setError("Please enter correct " + key);
        err = true;
      }
    });

    if (!err) {
      try {
        setLoader(true);
        await fetch(siteConfig.links.signupForm, {
          method: "POST",
          body: data,
        });
        setCurrentStep((prev: number) => prev + 1);
        setLoader(false);
        scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } catch (error) {
        setError("Oops! Please Retry");
        console.error(error);
      }
    }
  };

  return (
    <div className={`form-wrapper ${loader ? "opacity-50" : ""}`}>
      {loader ? (
        <div className="loader-comp">
          <Spinner color="default" labelColor="foreground" />
        </div>
      ) : null}
      {Object.keys(values).map((key) => (
        <div key={toCamelCase(key)} className="form-element">
          <label className="text-title" htmlFor={toCamelCase(key)}>
            {key}
            <span className="text-red-500">* </span>:
          </label>
          <input
            required
            className="input-box"
            disabled={loader}
            id={toCamelCase(key)}
            name={key}
            type="text"
            value={values[key]}
            onChange={(e) => {
              setError("");
              const val = e.target.value;

              setValue(key, val);
            }}
          />
        </div>
      ))}
      {error ? (
        <div className="text-red-500 text-lg text-center">{error}</div>
      ) : null}
      <CustomButton
        className="bg-secondary w-50p mx-auto mt-4 justify-center"
        onClick={onFormSubmit}
      >
        Submit
      </CustomButton>
    </div>
  );
};

export default FormInput;
