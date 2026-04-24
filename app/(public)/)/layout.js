import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-2">
        {children}
      </main>
      <Footer />
    </>
  );
}
