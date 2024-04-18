/* eslint-disable react/no-unescaped-entities */

const Contact = () => {
  return (
    <div className="bg-white text-black px-4 py-8 lg:bg-fontDesktop md:h-[35vw]">
      <h1 className="text-4xl font-bold mb-16 lg:text-center">Contact</h1>

      <div className="lg:flex lg:flex-wrap lg:gap-12 justify-center">
        <div className="text-center mb-8 lg:border lg:bg-white lg:p-12 lg:w-[320px]">
          <h2 className="text-2xl font-semibold mb-8">Email</h2>
          <p className="text-lg mb-6">maxemaleni@gmail.com</p>
          <hr className="border-t border-gray-300 my-10 lg:hidden" />
        </div>

        <div className="text-center mb-8 lg:border lg:bg-white lg:py-12 lg:px-[88px] lg:w-[320px]">
          <h2 className="text-2xl font-semibold mb-8">Téléphone</h2>
          <p className="text-lg mb-6">03 60 45 89 25</p>
          <hr className="border-t border-gray-300 my-10 lg:hidden" />
        </div>

        <div className="text-center mb-8 lg:border lg:bg-white lg:py-[34px] lg:px-[82px] lg:w-[320px]">
          <h2 className="text-2xl font-semibold mb-8">Localisation</h2>
          <p className="text-lg mb-6">
            3 rue de l'afci
            <br />
            Beauvais, 60000
          </p>
          <hr className="border-t border-gray-300 my-10 lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
