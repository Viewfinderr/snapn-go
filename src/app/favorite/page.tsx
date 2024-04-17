"use client";

import Favorites from "@/Components/favorites";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/UI/footer";

// Définir la fonction de composant de page
const favoritesPage = () => {
  return (
    <div>
      <Favorites></Favorites>
      <Navbar></Navbar>
      <Footer />
    </div>
  );
};

// Exporter le composant de favoritsPage
export default favoritesPage;
