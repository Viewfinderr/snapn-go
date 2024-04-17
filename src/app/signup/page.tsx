"use client";
import Footer from "@/Components/UI/footer";
import Navbar from "@/Components/navbar";
import Register from "@/Components/register";

// Définir la fonction de composant de page
const Page = () => {
  return (
    <>
      <Register></Register>
      <Navbar></Navbar>
      <Footer />
    </>
  );
};

// Exporter le composant de page
export default Page;
