import { useState } from 'react';
import questions from '../../public/AWS.json';

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState('');

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
  };

  const nextQuestion = () => {
    setSelectedChoice('');
    setCurrentQuestion((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="questions">
      {questions.length > 0 && (
        <div className="question-card">
          <h2>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].choices.map((choice, index) => (
              <li key={index} onClick={() => handleChoice(choice)}>
                {choice}
              </li>
            ))}
          </ul>
          {selectedChoice && (
            <p>
              {selectedChoice === questions[currentQuestion].answer
                ? 'Correct!'
                : `Wrong! Correct answer is ${questions[currentQuestion].answer}`}
            </p>
          )}
          <button onClick={nextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Questions;
