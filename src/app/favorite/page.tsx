"use client";

import Favorites from "@/Components/favorites";
import Navbar from "@/Components/navbar";
import Footer from "@/Components/UI/footer";
import DesktopNav from "@/Components/DesktopNav";

// Définir la fonction de composant de page
const favoritesPage = () => {
  return (
    <div>
      <DesktopNav />
      <Favorites></Favorites>
      <Navbar></Navbar>
      <Footer />
    </div>
  );
};

// Exporter le composant de favoritsPage
export default favoritesPage;
