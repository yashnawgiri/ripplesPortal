import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function FeaturesPage() {
  return (
    <DefaultLayout>
      <section className="main-section">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Features</h1>
        </div>
      </section>
    </DefaultLayout>
  );
}
