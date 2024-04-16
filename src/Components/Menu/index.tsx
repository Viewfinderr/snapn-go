// components/MenuComponent.js

import Link from "next/link";

const MenuComponent = () => {
  return (
    <div className="bg-white text-black px-8 py-12">
      <h2 className="text-5xl font-bold mb-20 text-center">Menu</h2>
      <div className="flex flex-col space-y-8">
        <Link href="/contact">
          <div className="border-2 border-gray-300 p-2 text-lg text-center rounded-md shadow-sm hover:bg-gray-100 cursor-pointer transition-all duration-300">
            Contact
          </div>
        </Link>
        <Link href="/historique">
          <div className="border-2 border-gray-300 p-2 text-lg text-center rounded-md shadow-sm hover:bg-gray-100 cursor-pointer transition-all duration-300">
            Historique
          </div>
        </Link>
        <Link href="/favorite">
          <div className="border-2 border-gray-300 p-2 text-lg text-center rounded-md shadow-sm hover:bg-gray-100 cursor-pointer transition-all duration-300">
            Favorite
          </div>
        </Link>
        <div className="flex justify-between items-center mt-8">
          <Link href="/cgv">
            <div className="border-2 border-gray-300 px-6 py-2 text-lg text-center rounded-md shadow-sm hover:bg-gray-100 cursor-pointer transition-all duration-300">
              CGV
            </div>
          </Link>
          <Link href="/cgu">
            <div className="border-2 border-gray-300 px-6 py-2 text-lg text-center rounded-md shadow-sm hover:bg-gray-100 cursor-pointer transition-all duration-300">
              CGU
            </div>
          </Link>
        </div>
        <Link href="/newsletter">
          <div className="border-2 border-gray-300 p-2 text-lg text-center rounded-md shadow-sm hover:bg-gray-100 cursor-pointer transition-all duration-300">
            Newsletter
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MenuComponent;
