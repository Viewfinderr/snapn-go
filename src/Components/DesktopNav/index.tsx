"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/auth/verifAuth");
        if (response.ok) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification du statut de connexion : ",
          error
        );
      }
    };

    checkLoginStatus();
  }, []);
  return (
    <header className="bg-yellow-500 justify-between items-center p-4 hidden md:flex">
      <div className="flex items-center">
        <Link href="/" className="flex  items-center">
          <img src="/icon.svg" alt="Logo" className="h-12 mr-4" />
          <span className="text-xl font-bold text-white">Snapn'Go</span>
        </Link>
      </div>
      <div className="relative">
        <input
          type="search"
          placeholder="Recherche..."
          className="w-full md:w-64 px-4 py-1 rounded-md focus:outline-none"
        />
        <button type="submit" className="absolute right-0 top-0 mt-1 mr-2">
          {/* <img src="/search-icon.svg" alt="Recherche" className="h-4 w-4 fill-current text-gray-600" /> */}
        </button>
      </div>
      <div>
        <Link
          href={isLoggedIn ? "/account" : "/choice"}
          className=" bg-green-600 text-white px-4 py-2 rounded-lg text-sm "
        >
          Connexion
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
