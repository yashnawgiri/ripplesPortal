import DefaultLayout from "@/layouts/default";
import policy from "@/data/privacyPolicy.json";

export default function PrivacyPolicy() {
    return (
        <DefaultLayout>
            <section className="main-section max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 text-white">
                    {policy.title}
                </h1>
                <p className="text-color mb-4">
                    {policy.effectiveDate}
                </p>
                <div>
                    {policy.sections.map((section, index) => (
                    <div key={index} className="mb-6 space-y-2">
                        <h2 className="text-2xl font-semibold heading-color">
                            {section.heading}
                        </h2>
                            <p className="text-color">{section.content}</p>
                    </div>
                ))}
                </div>
            </section>
        </DefaultLayout>
    );
}