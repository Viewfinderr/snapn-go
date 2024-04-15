import React from 'react';

const LegalNotice = () => {
  return (
    <div className="lg:bg-fontDesktop bg-greenButton flex justify-center items-center  ">
      <div className="max-w-3xl mx-auto p-8 lg:text-black text-white">
        <h2 className="text-3xl font-bold mb-4">Mentions Légales</h2>
        <p>
          Le site Snap'n Go est édité par BioFresh, une société par actions simplifiée au capital de 50 000 euros, immatriculée au Registre du Commerce et des Sociétés sous le numéro 123456789, dont le siège social est situé à 123 Rue des Fleurs, 75000 Paris, téléphone : +33 1 23 45 67 89, email : contact@biofresh.com.
        </p>
        <p className="mt-4">
          Directeur de la publication : Jean Dupont
        </p>
        <p className="mt-4">
          Le site Snap'n Go est hébergé par GreenHost, dont le siège social est situé à 456 Avenue des Arbres, 69000 Lyon, téléphone : +33 4 56 78 90 12, email : contact@greenhost.com.
        </p>
        <p className="mt-4">
          Conformément à la loi, le site Snap'n Go a fait l'objet d'une déclaration auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) sous le numéro 987654321.
        </p>
        <p className="mt-4">
          Le contenu du site Snap'n Go (textes, images, logos, etc.) est libre de droit.
        </p>
        <p className="mt-4">
          Pour toute question ou réclamation concernant le site Snap'n Go, vous pouvez contacter le service clientèle par email à l'adresse info@biofresh.com ou par téléphone au +33 1 23 45 67 89, du lundi au vendredi de 9h à 17h.
        </p>
        <p className="mt-4">Fait à Paris, le 10 avril 2024.</p>
        <p className="mt-4"> BioFresh</p>
      </div>
    </div>
  );
};

export default LegalNotice;
