"use client";
import Navbar from "@/Components/navbar";
import Choice from "@/Components/choiceLogin";
import Footer from "@/Components/UI/footer";
import DesktopNav from "@/Components/DesktopNav";

// Définir la fonction de composant de page
const Page = () => {
  return (
    <>
      <DesktopNav />
      <Choice />
      <Navbar />
      <Footer />
    </>
  );
};

// Exporter le composant de page
export default Page;
