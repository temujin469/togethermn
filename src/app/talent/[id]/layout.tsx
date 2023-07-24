import Footer from "@/components/footer/Footer";
import Header from "@/components/header";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 min-h-[calc(100vh-115px)]">
      <Header />
      {children}
      <Footer/>
    </div>
  );
}