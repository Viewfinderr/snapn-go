import React from "react";
import Footer from "@/Components/UI/footer";
import CGV from "@/Components/cgv";
import DesktopNav from "@/Components/DesktopNav";
// import BackButton from "@/Components/BackButton";

const App = () => {
  return (
    <div>
      <DesktopNav />
      <CGV />
      <Footer />
    </div>
  );
};

export default App;
