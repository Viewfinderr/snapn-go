"use client";
import Footer from "@/Components/UI/footer";
import Navbar from "@/Components/navbar";
import Register from "@/Components/register";
import DesktopNav from "@/Components/DesktopNav";

// Définir la fonction de composant de page
const Page = () => {
  return (
    <>
      <DesktopNav />
      <Register></Register>
      <Navbar></Navbar>
      <Footer />
    </>
  );
};

// Exporter le composant de page
export default Page;
