import Menu from "@/Components/Menu";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/UI/footer";
import DesktopNav from "@/Components/DesktopNav";
export default function MenuPage() {
  return (
    <div>
      <DesktopNav />
      <Menu />
      <Navbar />
      <Footer />
    </div>
  );
}
