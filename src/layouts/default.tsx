import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-center h-fit bg-custom-radial">
      <Navbar />
      <div className="center-parent-container mt-28">
        <main className="flex-grow items-center">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
