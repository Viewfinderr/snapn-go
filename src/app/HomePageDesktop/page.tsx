import HomePageDesktop from "@/Components/HomePageDesktop";
import Footer from "@/Components/UI/footer";
import DesktopNav from "@/Components/DesktopNav";

export default function DesktopPage() {
  return (
    <div>
      <DesktopNav />
      <HomePageDesktop />

      <Footer />
    </div>
  );
}
