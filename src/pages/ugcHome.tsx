import DefaultLayout from "@/layouts/default";
import HeroSection from "./HeroSection";


export default function UGCHomePage() {
    return (
        <DefaultLayout>
            <section className="main-section">
                <HeroSection/>

            </section>
        </DefaultLayout>
    );
}