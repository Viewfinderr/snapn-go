import FoodSlider from "@/Components/FoodSlider";
import Items from "@/Components/Items";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/UI/footer";

export default function Home() {
  return (
    <main>
      <FoodSlider />
      <Items />
      <Navbar />
      <Footer />
    </main>
  );
}
