import DesktopNav from "@/Components/DesktopNav";
import FoodSlider from "@/Components/FoodSlider";
import Items from "@/Components/Items";
import Footer from "@/Components/UI/footer";
import Navbar from "@/Components/navbar";
import { ItemsProvider } from "@/context/ItemsContext";

export default function Home() {
  return (
    <main>
      <DesktopNav />
      <ItemsProvider>
        <FoodSlider />
        <Items />
      </ItemsProvider>
      <Navbar />
      <Footer />
    </main>
  );
}
