import React from 'react';
const titleHeightPercentage = 10; // Pourcentage de la hauteur de l'écran que le titre devrait occuper
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-fontDesktop">
            {/* En-tête */}
            <div className="bg-fontDesktop text-black">
                <nav className="w-full flex justify-between items-center px-2 lg:px-10"> {/* Ajustez le padding ici */}
                    
                    <a href="#" className="hover:underline flex-1 text-center">Supermarché</a>
                    <a href="#" className="hover:underline flex-1 text-center">Mon panier</a>
                    <a href="#" className="hover:underline flex-1 text-center">Contact</a>
                    <a href="#" className="hover:underline flex-1 text-center">Login</a>
                    <a href="#" className="hover:underline flex-1 text-center">Mon compte</a>
                </nav>
            </div>
            {/* Espace entre la barre de navigation et l'image */}
            {/* Cette div est intentionnellement vide et sert d'espace de séparation */}
            <div style={{ height: `calc(20vh - ${titleHeightPercentage}vh)` }}></div>

            {/* Section de l'image avec titre */}
            <div className="relative w-full" style={{ height: '25vh' }}>
                <img
                    src="/panier.jpg"
                    alt="Panier"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Titre à cheval sur la marge et l'image */}
                <h1
                    className="text-greenButton text-9xl font-bold absolute left-36"
                    style={{
                        top: `calc(-${titleHeightPercentage / 2}vh)`, // Décaler le titre vers le haut pour qu'il soit à cheval
                        // mixBlendMode: 'difference',
                        lineHeight: `${titleHeightPercentage}vh` // Hauteur de ligne pour le titre
                    }}
                >
                    Snapn'Go
                </h1>
            </div>

            {/* Section sous l'image */}
            <div className="flex">
                {/* Colonne de texte à gauche (70% de largeur) */}
                <div className="w-6/10 p-8 mt-4 mx-36">
                    <h2 className="text-3xl font-bold mb-4">Bienvenue sur Snap'n Go — Votre destination pour une alimentation bio et saine à portée de clic !</h2>
                    <p className="mb-6">Découvrez la fraîcheur, la qualité et la commodité avec notre sélection minutieuse de produits bio, tous livrés directement à votre porte. Chez Snap'n Go, nous nous engageons à vous offrir le meilleur de la nature tout en soutenant une agriculture durable.</p>
                    <button className="bg-greenButton text-white px-6 py-2 rounded  ">Commencer</button>
                </div>

                {/* Colonne image à droite (30% de largeur) */}
                <div className="w-4/10  mr-36 ">
                    <img src="/disaster.jpg" alt="Disaster" className="object-contain h-80" />
                </div>
            </div>

           {/* Pied de page */}
<footer className="bg-yellow-400 mt-auto">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
    <div>
      <h3 className="text-lg font-semibold">Snapn'Go</h3>
      <ul className="mt-4 space-y-2">
        <li><a href="#" className="hover:underline">Qui sommes-nous ?</a></li>
        <li><a href="#" className="hover:underline">Nous contacter</a></li>
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-semibold">Légales</h3>
      <ul className="mt-4 space-y-2">
        <li><a href="#" className="hover:underline">Nos conditions générales</a></li>
        <li><a href="#" className="hover:underline">Mentions légales</a></li>
        <li><a href="#" className="hover:underline">Politique de confidentialité</a></li>
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-semibold">Commander</h3>
      <ul className="mt-4 space-y-2">
        <li><a href="#" className="hover:underline">Votre Panier</a></li>
        <li><a href="#" className="hover:underline">Vos Favoris</a></li>
        <li><a href="#" className="hover:underline">Votre historique</a></li>
      </ul>
    </div>
    <div>
      <h3 className="text-lg font-semibold">Account Settings</h3>
      <ul className="mt-4 space-y-2">
        <li><a href="#" className="hover:underline">My account</a></li>
        <li><a href="#" className="hover:underline">Login</a></li>
        <li><a href="#" className="hover:underline">Register</a></li>
      </ul>
    </div>
  </div>
  <div className="border-t border-yellow-600 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <p>© 2024 Snapn'Go - Tous droits réservés</p>
      <div>
        <a href="#"><img src="/app-store-badge.png" alt="Télécharger dans l'App Store" className="mr-2" /></a>
        <a href="#"><img src="/google-play-badge.png" alt="Disponible sur Google Play" /></a>
      </div>
    </div>
  </div>
</footer>
        </div>
    );
}