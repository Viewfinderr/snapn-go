'use client'

import Navbar from '@/Components/navbar';
import Register from "@/Components/register";

// Définir la fonction de composant de page
const Page = () => {
  return (
    <div>
      <Register></Register>
      <Navbar></Navbar>
    </div>
  );
};

// Exporter le composant de page
export default Page;
