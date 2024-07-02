import { useState, useEffect } from 'react';
import questions from '../questions.json';

const Questions = () => {
  const [allQuestions, setAllQuestions] = useState(questions);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newChoices, setNewChoices] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, total: 0 });

  const questionsPerSection = 50;
  const totalSections = Math.ceil(allQuestions.length / questionsPerSection);

  useEffect(() => {
    setStats(prevStats => ({
      ...prevStats,
      total: allQuestions.length
    }));
  }, [allQuestions]);

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    if (choice === allQuestions[currentQuestion].answer) {
      setStats(prevStats => ({ ...prevStats, correct: prevStats.correct + 1 }));
    } else {
      setStats(prevStats => ({ ...prevStats, incorrect: prevStats.incorrect + 1 }));
    }
  };

  const nextQuestion = () => {
    setSelectedChoice('');
    const nextQuestionIndex = (currentQuestion + 1) % questionsPerSection;
    if (nextQuestionIndex === 0 && currentQuestion !== 0) {
      setCurrentSection((prevSection) => (prevSection + 1) % totalSections);
    }
    setCurrentQuestion(nextQuestionIndex);
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

  const changeSection = (sectionIndex) => {
    setCurrentSection(sectionIndex);
    setCurrentQuestion(0);
    setSelectedChoice('');
  };

  const currentQuestionIndex = currentSection * questionsPerSection + currentQuestion;

  return (
    <div className="questions">
      <div className="stats-and-question">
        <div className="stats">
          <p>Total Questions: {stats.total}</p>
          <p>Correct: {stats.correct}</p>
          <p>Incorrect: {stats.incorrect}</p>
          <p>Percentage: {((stats.correct / (stats.correct + stats.incorrect)) * 100 || 0).toFixed(2)}%</p>
        </div>
        {allQuestions.length > 0 && (
          <div className="question-card">
            <h2>{allQuestions[currentQuestionIndex].question}</h2>
            <ul>
              {allQuestions[currentQuestionIndex].choices.map((choice, index) => (
                <li 
                  key={index} 
                  onClick={() => handleChoice(choice)}
                  style={{backgroundColor: selectedChoice === choice ? 
                    (choice === allQuestions[currentQuestionIndex].answer ? 'green' : 'red') 
                    : ''}}
                >
                  {choice}
                </li>
              ))}
            </ul>
            <div className="result-area">
              {selectedChoice && (
                <p>
                  {selectedChoice === allQuestions[currentQuestionIndex].answer
                    ? 'Correct!'
                    : `Wrong! Correct answer is ${allQuestions[currentQuestionIndex].answer}`}
                </p>
              )}
            </div>
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
      <div className="sections">
        {[...Array(totalSections)].map((_, index) => (
          <button key={index} onClick={() => changeSection(index)}>
            Section {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
