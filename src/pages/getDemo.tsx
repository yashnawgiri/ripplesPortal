// import FormInput from "@/components/FormInput";
// import Stepper from "@/components/Stepper";
import { useState } from "react";
import { InlineWidget } from "react-calendly";

import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";
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
      <section className="main-section ">
        <p className="heading-color text-lg">{getDemoData.description}</p>
        <div className="w-full">
          <InlineWidget
            prefill={{
              email: formData["Email"],
              name: formData["Name"],
              smsReminderNumber: `+91${formData["Phone number"]}`,
            }}
            url={siteConfig.links.calendly}
          />
        </div>
      </section>
    </DefaultLayout>
  );
}
