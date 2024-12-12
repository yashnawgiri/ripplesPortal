// import FormInput from "@/components/FormInput";
// import Stepper from "@/components/Stepper";
import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";
import { useState } from "react";
import { InlineWidget } from "react-calendly";
import getDemoData from "@/data/getDemo.json";

export default function GetDemo() {
  const [formData] = useState(siteConfig.formInput);

  // const setFormDataforKey = (key: any, value: any) => {
  //   setFromData((prev) => {
  //     return {
  //       ...prev,
  //       [key]: value
  //     };
  //   });
  // };

  return (
    <DefaultLayout>
      <section className="main-section">
        <p className="heading-color text-lg mb-2">
          {getDemoData.description}
        </p>
        <div className="inline-block max-w-lg text-center justify-center">
          {/* Remove Stepper since Step 1 is removed */}
        </div>
        <div className="w-100p">
          <InlineWidget
            url={siteConfig.links.calendly}
            prefill={{
              email: formData["Email"],
              name: formData["Name"],
              smsReminderNumber: `+91${formData["Phone number"]}`
            }}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
