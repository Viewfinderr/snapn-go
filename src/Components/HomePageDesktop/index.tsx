/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from 'next/link'; // Importez Link de next/link

const titleHeightPercentage = 10; // Pourcentage de la hauteur de l'écran que le titre devrait occuper

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-fontDesktop">
      {/* En-tête */}
      <div className="bg-fontDesktop text-black">
        <nav className="w-full flex justify-between items-center px-2 lg:px-10 font-extrabold mt-2 mb-8 text-xl">
          {" "}
          {/* Ajustez le padding ici */}
          <Link href="/">
            <p className="hover:underline flex-1 text-center">
              Snapn'Go
            </p>
          </Link>
          <Link href="#">
            <p className="hover:underline flex-1 text-center">
              Supermarché
            </p>
          </Link>
          <Link href="/cart">
            <p className="hover:underline flex-1 text-center">
              Mon panier
            </p>
          </Link>
          <Link href="/contact">
            <p className="hover:underline flex-1 text-center">
              Contact
            </p>
          </Link>
          <Link href="#">
            <p className="hover:underline flex-1 text-center">
              Login
            </p>
          </Link>
          <Link href="#">
            <p className="hover:underline flex-1 text-center">
              Mon compte
            </p>
          </Link>
        </nav>
      </div>
      {/* Espace entre la barre de navigation et l'image */}
      {/* Cette div est intentionnellement vide et sert d'espace de séparation */}
      <div style={{ height: `calc(20vh - ${titleHeightPercentage}vh)` }}></div>
      {/* Section de l'image avec titre */}
      <div className="relative w-full" style={{ height: "30vh" }}>
        <img
          src="/SquareBobPants.png"
          alt="Panier"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Titre à cheval sur la marge et l'image */}
        <h1
          className="text-greenButton text-[180px] font-black absolute left-36 "
          style={{
            top: `calc(-${titleHeightPercentage / 2}vh)`, // Décaler le titre vers le haut pour qu'il soit à cheval
            // mixBlendMode: 'difference',
            lineHeight: `${titleHeightPercentage}vh`, // Hauteur de ligne pour le titre
          }}
        >
          Snapn'Go
        </h1>
      </div>
      <div className="mb-5 h-5 w-full bg-green-800"></div>{" "}
      {/* Marge de 5px de haut */}

      {/* Section sous l'image */}
      <div className="flex mb-24">
        {/* Colonne de texte à gauche (70% de largeur) */}
        <div className="p-8 mt-4 mx-36">
          <h2 className="text-3xl font-bold mb-4">
            Bienvenue sur Snap'n Go — Votre destination pour une alimentation
            bio et saine à portée de clic !
          </h2>
          <p className="mb-6 w-[810px]">
            Découvrez la fraîcheur, la qualité et la commodité avec notre
            sélection minutieuse de produits bio, tous livrés directement à
            votre porte. Chez Snap'n Go, nous nous engageons à vous offrir le
            meilleur de la nature tout en soutenant une agriculture durable.
          </p>
          <Link href="/">
          <button className="bg-greenButton text-white px-6 py-2 w-64 h-14 font-bold ">
            Commencer
          </button>
          </Link>
        </div>

        {/* Colonne image à droite (30% de largeur) */}
        <div className="mr-16 mt-8">
          <img
            src="/disaster.jpg"
            alt="Disaster"
            className="object-fill h-64 w-[600px] "
          />
        </div>
      </div>
    </div>
  );
}
