import { useState } from 'react';
import studyMaterials from '../studyMaterial.json';

const Flashcards = () => {
  const [materials, setMaterials] = useState(studyMaterials);
  const [currentCard, setCurrentCard] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % materials.length);
  };

  const addNewMaterial = () => {
    if (newTitle && newContent) {
      setMaterials([...materials, {
        title: newTitle,
        content: newContent.split('\n')
      }]);
      setNewTitle('');
      setNewContent('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="flashcards">
      {materials.length > 0 && (
        <div className="card">
          <h2>{materials[currentCard].title}</h2>
          <ul>
            {materials[currentCard].content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button onClick={nextCard}>Next</button>
        </div>
      )}
      {!showAddForm && (
        <button className="add-toggle-button" onClick={() => setShowAddForm(true)}>Add New Flashcard</button>
      )}
      {showAddForm && (
        <div className="add-form">
          <input
            type="text"
            placeholder="New title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            placeholder="New content (separate lines with Enter)"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button onClick={addNewMaterial}>Submit</button>
          <button onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Flashcards;