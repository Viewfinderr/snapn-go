import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-yellow-500 flex justify-between items-center p-4">
      <div className="flex items-center">
        <img src="/icon.svg" alt="Logo" className="h-12 mr-4" />
        <span className="text-xl font-bold text-white">Snapn'Go</span>
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
        <a href="/login" className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm ">
          Connexion
        </a>
      </div>
    </header>
  );
};

export default Navbar;

