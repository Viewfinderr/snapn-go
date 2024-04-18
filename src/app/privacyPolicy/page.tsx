import Navbar from "@/Components/navbar";
import PrivacyPolicy from "@/Components/privacyPolicy";
import Footer from "@/Components/UI/footer";
import DesktopNav from "@/Components/DesktopNav";
const App = () => {
  return (
    <div>
      <DesktopNav />
      <PrivacyPolicy />
      <Navbar />
      <Footer />
    </div>
  );
};

export default App;
