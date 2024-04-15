// components/ContactComponent.js

const ContactComponent = () => {
    return (
      <div className="bg-white text-black px-4 py-8">
        <h1 className="text-4xl font-bold mb-16">Contact</h1>
        
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-8">Email</h2>
            <p className="text-xl mb-6">maxemaleni@gmail.com</p>
            <hr className="border-t border-gray-300 my-10" />
          </div>
  
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-8">Téléphone</h2>
            <p className="text-xl mb-6">03 60 45 89 25</p>
            <hr className="border-t border-gray-300 my-10" />
          </div>
  
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-8">Localisation</h2>
            <p className="text-xl mb-6">3 rue de l'afci<br />Beauvais, 60000</p>
            <hr className="border-t border-gray-300 my-10" />
          </div>
        </div>
  
       
      </div>
    );
  };
  
  export default ContactComponent;
  