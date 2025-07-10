import DefaultLayout from "@/layouts/default";
import ReferralCommissionCalculator from "@/components/ReferralCommissionCalculator";

export default function ReferralCommissionCalculatorPage() {
  return (
    <DefaultLayout>
      <section className="main-section shadow-none">
        <ReferralCommissionCalculator />
      </section>
    </DefaultLayout>
  );
}
