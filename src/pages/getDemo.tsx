// import FormInput from "@/components/FormInput";
// import Stepper from "@/components/Stepper";
import { useState } from "react";
import { InlineWidget } from "react-calendly";

import { siteConfig } from "@/config/site";
import DefaultLayout from "@/layouts/default";
import getDemoData from "@/data/getDemo.json";

export default function GetDemo() {
  const [formData] = useState(siteConfig.formInput);

  return (
    <DefaultLayout>
      <section className="main-section px-2 py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:text-start text-center">
          {/* Left Section: Header and Text */}
          <div className="flex flex-col items-start lg:w-1/2">
            <h1 className="white-gray-gradient text-2xl md:text-7xl  font-bold mb-4 ">
              {getDemoData.heading}
            </h1>
            <p className="text-sm md:text-2xl text-gray-300 ">
              {getDemoData.description}
            </p>
            <p className="text-sm md:text-2xl text-secondary font-bold text-center w-full md:text-start">
              {getDemoData.description2}
            </p>
          </div>

          {/* Right Section: Calendly Widget */}
          <div className="w-full lg:w-1/2">
            <InlineWidget
              prefill={{
                email: formData["Email"],
                name: formData["Name"],
                smsReminderNumber: `+91${formData["Phone number"]}`,
              }}
              url={siteConfig.links.calendly}
              styles={{
                height: "600px",
              }}
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
