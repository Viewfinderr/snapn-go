/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from 'next/link'; // Importez Link de next/link

export default function Footer() {
    return (
      /* Pied de page */
      <footer className="bg-[#E1A325] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
          <div>
            <h3 className="font-semibold">Snapn'Go</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/AboutUs">
                  <p className="hover:underline ">Qui sommes-nous ?</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p className="hover:underline">Nous contacter</p>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className=" font-semibold">Légales</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/cgv">
                  <p className="hover:underline">Nos conditions générales</p>
                </Link>
              </li>
              <li>
                <Link href="/legalNotice">
                  <p className="hover:underline">Mentions légales</p>
                </Link>
              </li>
              <li>
                <Link href="/privacyPolicy">
                  <p className="hover:underline">Politique de confidentialité</p>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className=" font-semibold">Commander</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/cart">
                  <p className="hover:underline">Votre Panier</p>
                </Link>
              </li>
              <li>
                <Link href="/favorite">
                  <p className="hover:underline">Vos Favoris</p>
                </Link>
              </li>
              <li>
                <Link href="/history">
                  <p className="hover:underline">Votre historique</p>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className=" font-semibold">Account Settings</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/account">
                  <p className="hover:underline">My account</p>
                </Link>
              </li>
              <li>
                <Link href="/Login">
                  <p className="hover:underline">Login</p>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <p className="hover:underline">Register</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-yellow-600 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <p>© 2024 Snapn'Go - Tous droits réservés</p>
            <div className="flex flex-wrap">
              <Link href="#">
                <p>
                  <img
                    src="/badge-apple-store.png"
                    alt="Télécharger dans l'App Store"
                    className="mr-2"
                  />
                </p>
              </Link>
              <Link href="#">
                <p>
                  <img
                    src="/badge-play-store.png"
                    alt="Disponible sur Google Play"
                  />
                </p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
}
