import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Questions = ({ handleNextQuestion, handlePrevQuestion, currentQuestion, handleAnswerClick, isLastq }) => {
    const optionIds = ['A', 'B', 'C', 'D'];
    const [selectedOptions, setSelectedOptions] = useState(() => {
        const savedAnswers = JSON.parse(localStorage.getItem('selectedAnswers')) || {};
        return savedAnswers;
    });
    const [questions, setQuestions] = useState([]);
    const [timer, setTimer] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
        setQuestions(savedQuestions);
    }, []);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    handleNextQuestionOrSubmit(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [currentQuestion]);

    const handleOptionClick = (option) => {
        setSelectedOptions((prev) => ({ ...prev, [currentQuestion]: option }));
    };

    const handleClearSelection = () => {
        setSelectedOptions((prev) => ({ ...prev, [currentQuestion]: undefined }));
    };

    const handleNextQuestionOrSubmit = (isTimedOut = false) => {
        const selectedForCurrent = selectedOptions[currentQuestion] 
            ? [selectedOptions[currentQuestion]] 
            : [];

        handleAnswerClick(selectedForCurrent);

        if (isLastq) {
            if (isTimedOut) {
                navigate('/score');
            } else {
                const isConfirmed = window.confirm("Are you sure you want to submit the quiz?");
                if (isConfirmed) {
                    navigate('/score');
                }
            }
        } else {
            handleNextQuestion();
            setTimer(10);
        }
    };

    if (!questions || questions.length === 0 || !questions[currentQuestion]) {
        return <div>No questions yet. Add new questions.</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h5 className="text-primary">
                        Question {currentQuestion + 1}/{questions.length}
                    </h5>
                    
                    <h6 className="text-danger">
                        Time remaining: {timer} seconds
                    </h6>
                    
                    <h4 className="card-title mb-4 text-dark">
                        {questions[currentQuestion].question}
                    </h4>
                    <div className="list-group">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                className={`list-group-item list-group-item-action mt-2 ${selectedOptions[currentQuestion] === option ? 'active' : ''}`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {optionIds[index]}) {option}
                            </button>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <button className="btn btn-warning" onClick={handleClearSelection}>Clear Selection</button>
                        <div>
                            {currentQuestion > 0 && (
                                <button className="btn btn-secondary me-2" onClick={handlePrevQuestion}>Previous Question</button>
                            )}
                            <button className={`btn ${isLastq ? 'btn-danger' : 'btn-primary'}`} onClick={() => handleNextQuestionOrSubmit(false)}>
                                {isLastq ? 'Submit' : 'Next Question'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questions;
