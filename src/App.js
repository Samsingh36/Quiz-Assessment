import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Questions from './Components/Questions';
import Score from './Components/Score';
import QuizCreator from './Components/QuizCreator';

const App = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [timer, setTimer] = useState(60);
    const [quizTaken, setQuizTaken] = useState(false);

    useEffect(() => {
        const savedQuizTaken = JSON.parse(localStorage.getItem('quizTaken')) || false;
        setQuizTaken(savedQuizTaken);

        if (!savedQuizTaken) {
            const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
            setQuestions(savedQuestions);
        }
    }, []);

    const handleStartNewQuiz = () => {
        if (quizTaken) {
            alert('You have already taken the quiz. You cannot retake it.');
            return;
        }

        const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];

        if (savedQuestions.length === 0) {
            alert('No questions found. Please create a quiz first.');
            return;
        }

        const userConfirmed = window.confirm("Are you sure you want to start the quiz?");
        if (userConfirmed) {
            setQuestions(savedQuestions);
            setQuizStarted(true);
        }
    };

    const handleQuizCompletion = () => {
        setQuizTaken(true);
        localStorage.setItem('quizTaken', JSON.stringify(true));
        setQuizStarted(false);

        localStorage.removeItem('quizQuestions');
        setQuestions([]);
        setCurrentQuestion(0);
    };

    const handleResetQuiz = () => {
        localStorage.removeItem('quizTaken');
        alert('You can now create a new quiz!');
        setQuizTaken(false);
    };

    const handleNextQuestion = () => {
        setCurrentQuestion((prev) => (prev + 1 < questions.length ? prev + 1 : prev));
    };

    const handlePrevQuestion = () => {
        setCurrentQuestion((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleAnswerClick = (selectedOptions) => {
        const currentQuestionData = questions[currentQuestion];
        
        if (!currentQuestionData || !currentQuestionData.correctAnswer) {
            return;
        }

        const correctAnswers = currentQuestionData.correctAnswer;
        let isCorrect = false;

        if (selectedOptions && selectedOptions.length > 0) {
            if (Array.isArray(correctAnswers)) {
                isCorrect = selectedOptions.every(option => correctAnswers.includes(option)) &&
                            selectedOptions.length === correctAnswers.length;
            } else {
                isCorrect = selectedOptions.length === 1 && selectedOptions[0] === correctAnswers;
            }
        }

        if (isCorrect) {
            setScore(prevScore => prevScore + currentQuestionData.marks); 
        }
    };

    const handleCreateQuizClick = () => {
        if (quizTaken) {
            alert("You have already taken the quiz. Please reset the quiz first before creating a new one.");
        } else {
            if (questions.length === 0) {
                alert("You will be able to create a quiz after this.");
            } else {
                alert("You will be able to modify the quiz.");
            }
            window.location.href = "/create-quiz";  
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/create-quiz" element={<QuizCreator />} />
                <Route 
                    path="/score" 
                    element={
                        <Score 
                            score={score} 
                            setScore={setScore} 
                            setCurrentQuestion={setCurrentQuestion} 
                            setQuizStarted={setQuizStarted} 
                            setTimer={setTimer}
                            handleQuizCompletion={handleQuizCompletion} 
                        />
                    } 
                />
                <Route 
                    path="/" 
                    element={
                        quizStarted ? (
                            <Questions 
                                handleNextQuestion={handleNextQuestion} 
                                handlePrevQuestion={handlePrevQuestion} 
                                currentQuestion={currentQuestion} 
                                handleAnswerClick={handleAnswerClick} 
                                isLastq={currentQuestion === questions.length - 1} 
                                timer={timer} 
                                setTimer={setTimer} 
                                handleQuizCompletion={handleQuizCompletion}
                            />
                        ) : (
                            <div className="landing-page">
                                <div className="card-container">
                                    <h1 className="app-title">Welcome to the BrightChamps Quiz</h1>
                                    <p className="subtitle">Are you ready to test your knowledge?</p>
                                    <div className="button-group d-flex justify-content-center">
                                        <button className="btn btn-lg start-btn mx-2" onClick={handleStartNewQuiz}>
                                            Start New Quiz
                                        </button>
                                        <button className="btn btn-lg create-btn mx-2" onClick={handleCreateQuizClick}>
                                            Create New Quiz
                                        </button>
                                        {quizTaken && (
                                            <button className="btn btn-lg reset-btn" onClick={handleResetQuiz}>
                                                Reset Quiz
                                            </button>
                                        )}
                                    </div>
                                    {quizTaken && <p className="text-danger">You have already taken the quiz.</p>}
                                </div>
                            </div>
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
