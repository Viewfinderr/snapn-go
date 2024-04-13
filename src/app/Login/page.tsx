'use client'

import Login from "@/Components/formLogin";
import Navbar from '@/Components/navbar';

// Définir la fonction de composant de page
const Page = () => {
  return (
    <div>
      <Login></Login>
      <Navbar></Navbar>
      
    </div>
  );
};

// Exporter le composant de page
export default Page;
