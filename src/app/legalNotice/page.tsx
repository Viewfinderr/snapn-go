import LegalNotice from "@/Components/legalNotice";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/UI/footer";
import DesktopNav from "@/Components/DesktopNav";

const App = () => {
  return (
    <div>
      <DesktopNav />
      <LegalNotice />
      <Navbar />
      <Footer />
    </div>
  );
};

export default App;
