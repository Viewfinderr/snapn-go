"use client";
import Footer from "@/Components/UI/footer";
import Account from "@/Components/Account";
import Navbar from "@/Components/navbar";

// Définir la fonction de composant de page
const Page = () => {
  return (
    <>
      <Account />
      <Navbar />
      <Footer />
    </>
  );
};

// Exporter le composant de page
export default Page;
