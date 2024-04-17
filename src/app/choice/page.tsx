"use client";
import Navbar from "@/Components/navbar";
import Choice from "@/Components/choiceLogin";
import Footer from "@/Components/UI/footer";

// Définir la fonction de composant de page
const Page = () => {
  return (
    <>
      <Choice />
      <Navbar />
      <Footer />
    </>
  );
};

// Exporter le composant de page
export default Page;
