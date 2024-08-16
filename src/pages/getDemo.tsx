import FormInput from "@/components/FormInput";
import Stepper from "@/components/Stepper";
import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";
import { useState } from "react";
import { InlineWidget } from "react-calendly";

export default function GetDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFromData] = useState(siteConfig.formInput);

  const setFormDataforKey = (key: any, value: any) => {
    setFromData((prev) => {
      return {
        ...prev,
        [key]: value
      };
    });
  };
  return (
    <DefaultLayout>
      <section className="section">
        <p className="text-gray-300 text-lg mb-2">
          Sign Up Today to get the early bird offer of a 30 Day Free Trial
        </p>
        <div className="inline-block max-w-lg text-center justify-center">
          <Stepper
            currentStep={currentStep}
            setCurrentStep={setCurrentStep} />
        </div>
        {(currentStep == 1) ?
          <FormInput
            values={formData}
            setValue={setFormDataforKey}
            setCurrentStep={setCurrentStep} /> :
          <div className="w-100p">
            <InlineWidget
              url={siteConfig.links.calendly}
              prefill={{
                email: formData["Email"],
                name: formData["Name"],
                smsReminderNumber: `+91${formData["Phone number"]}`
              }}
            />
          </div>}
      </section>
    </DefaultLayout>
  );
}
