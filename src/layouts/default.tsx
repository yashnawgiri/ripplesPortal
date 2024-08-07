import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

export default function DefaultLayout({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col items-center h-fit bg-custom-radial">
            <Navbar/>
            <main className="container x-6 flex-grow items-center">
                {children}
            </main>
            <Footer/>
        </div>
    );
}
