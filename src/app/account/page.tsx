"use client";
import Account from "@/Components/Account";
import DesktopNav from "@/Components/DesktopNav";
import Footer from "@/Components/UI/footer";
import Navbar from "@/Components/navbar";

// Définir la fonction de composant de page
const Page = () => {
  return (
    <>
      <DesktopNav />
      <Account />
      <Navbar />
      <Footer />
    </>
  );
};

// Exporter le composant de page
export default Page;
