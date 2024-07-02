import { useState } from 'react';
import studyMaterials from '../../public/studyMaterial.json';

const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % studyMaterials.length);
  };

  return (
    <div className="flashcards">
      {studyMaterials.length > 0 && (
        <div className="card">
          <h2>{studyMaterials[currentCard].title}</h2>
          <ul>
            {studyMaterials[currentCard].content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button onClick={nextCard}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
