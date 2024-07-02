import { useState } from 'react';
import questions from '../questions.json';

const Questions = () => {
  const [allQuestions, setAllQuestions] = useState(questions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newChoices, setNewChoices] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
  };

  const nextQuestion = () => {
    setSelectedChoice('');
    setCurrentQuestion((prev) => (prev + 1) % allQuestions.length);
  };

  const addNewQuestion = () => {
    if (newQuestion && newChoices && newAnswer) {
      setAllQuestions([...allQuestions, {
        question: newQuestion,
        choices: newChoices.split('\n'),
        answer: newAnswer
      }]);
      setNewQuestion('');
      setNewChoices('');
      setNewAnswer('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="questions">
      {allQuestions.length > 0 && (
        <div className="question-card">
          <h2>{allQuestions[currentQuestion].question}</h2>
          <ul>
            {allQuestions[currentQuestion].choices.map((choice, index) => (
              <li 
                key={index} 
                onClick={() => handleChoice(choice)}
                style={{backgroundColor: selectedChoice === choice ? 
                  (choice === allQuestions[currentQuestion].answer ? 'green' : 'red') 
                  : ''}}
              >
                {choice}
              </li>
            ))}
          </ul>
          {selectedChoice && (
            <p>
              {selectedChoice === allQuestions[currentQuestion].answer
                ? 'Correct!'
                : `Wrong! Correct answer is ${allQuestions[currentQuestion].answer}`}
            </p>
          )}
          <button onClick={nextQuestion}>Next</button>
        </div>
      )}
      {!showAddForm && (
        <button className="add-toggle-button" onClick={() => setShowAddForm(true)}>Add New Question</button>
      )}
      {showAddForm && (
        <div className="add-form">
          <input
            type="text"
            placeholder="New question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <textarea
            placeholder="New choices (separate with Enter)"
            value={newChoices}
            onChange={(e) => setNewChoices(e.target.value)}
          />
          <input
            type="text"
            placeholder="Correct answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
          />
          <button onClick={addNewQuestion}>Submit</button>
          <button onClick={() => setShowAddForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Questions;