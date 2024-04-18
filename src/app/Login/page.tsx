"use client";

import Login from "@/Components/formLogin";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/UI/footer";
import DesktopNav from "@/Components/DesktopNav";

// Définir la fonction de composant de page
const Page = () => {
  return (
    <>
      <DesktopNav />
      <Login></Login>
      <Navbar></Navbar>
      <Footer />
    </>
  );
};

// Exporter le composant de page
export default Page;
