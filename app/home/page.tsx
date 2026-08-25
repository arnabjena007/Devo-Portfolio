import Footer from "@/components/layout/Footer";
import { HomePage } from "@/components/sections/HomePage";

export default function MainPortfolioPage() {
  return (
    <div className="relative mx-auto flex w-full flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 w-full">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}
