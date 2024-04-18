import DesktopNav from "@/Components/DesktopNav";
import FoodSlider from "@/Components/FoodSlider";
import Items from "@/Components/Items";
import Footer from "@/Components/UI/footer";
import Navbar from "@/Components/navbar";

export default function Home() {
  return (
    <main>
      <DesktopNav />
      <FoodSlider />
      <Items />
      <Navbar />
      <Footer />
    </main>
  );
}
