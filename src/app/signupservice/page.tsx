"use client";
import Footer from "@/Components/UI/footer";
import ServiceRegister from "@/Components/serviceRegister";
import DesktopNav from "@/Components/DesktopNav";

// Définir la fonction de composant de page
const Page = () => {
  return (
    <>
      <DesktopNav />
      <ServiceRegister></ServiceRegister>
      <Footer />
    </>
  );
};

// Exporter le composant de page
export default Page;
