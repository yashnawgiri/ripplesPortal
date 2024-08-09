import CustomButton from "./CustomButton";
import { siteConfig } from "@/config/site";
import { checkValueByType, toCamelCase } from "../utils/utils";
import { useState } from "react";
import { Spinner } from "@nextui-org/spinner";


interface FormInputProps {
  setValue: any;
  values: any;
  setCurrentStep: any;
}

const FormInput: React.FC<FormInputProps> = ({ values, setValue, setCurrentStep }) => {
  const [error, setError] = useState<String>("");
  const [loader, setLoader] = useState(false);

  const onFormSubmit = async () => {
    setError("");
    let err = false;
    const data = new FormData();
    Object.keys(values).map(key => {
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
          body: data
        });
        setCurrentStep((prev: number) => prev + 1);
        setLoader(false);
        scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } catch (error) {
        setError("Oops! Please Retry");
        console.log(error);
      }
    }
  };

  return (
    <div className={`form-wrapper ${loader ? "opacity-50" : ""}`}>
      {loader ?
        <div className="loader-comp">
          <Spinner color="default" labelColor="foreground" />
        </div>
        : null}
      {Object.keys(values).map((key) => (
        <div
          className="form-element"
          key={toCamelCase(key)}>
          <label htmlFor="key" className="text-title">
            {key}<span className="text-red-500">* </span>:
          </label>
          <input
            type="text"
            required
            id={toCamelCase(key)}
            name="key"
            disabled={loader}
            className="input-box"
            value={values[key]}
            onChange={(e) => {
              setError("");
              let val = e.target.value;
              setValue(key, val);
            }} />
        </div>))}
      {error ?
        <div className="text-red-500 text-lg text-center">
          {error}
        </div> : <></>}
      <CustomButton
        className="bg-[#7214FF] w-50p mx-auto mt-4 justify-center"
        onClick={onFormSubmit}>
        Submit
      </CustomButton>
    </div>
  );
};

export default FormInput;
