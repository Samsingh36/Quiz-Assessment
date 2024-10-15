import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizCreator = () => {
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState('');
    const [marks, setMarks] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [timerDuration, setTimerDuration] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions')) || [];
        setQuestions(savedQuestions);
    }, []);

    const handleSaveQuestion = () => {
        console.log("Attempting to save the question...");

        if (!questionText || options.some(opt => !opt) || !correctOption) {
            alert("Please fill in all fields.");
            return false;
        }

        const newQuestion = {
            question: questionText,
            options: [...options],
            correctAnswer: correctOption,
            marks: marks,
            timer: timerDuration,
        };

        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
        console.log("Question saved successfully.");
        alert("Question Saved");
        return true;
    };

    const handleResetFields = () => {
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectOption('');
        setMarks(1);
        setTimerDuration(10);
    };

    return (
        <div className="container">
            <h2 className="mt-4">Create a Quiz</h2>
            <div className="form-group mt-3">
                <label>Question</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={questionText} 
                    onChange={(e) => setQuestionText(e.target.value)} 
                />
            </div>
            <div className="form-group mt-3">
                <label>Options</label>
                {options.map((option, index) => (
                    <input 
                        key={index}
                        type="text" 
                        className="form-control mb-2" 
                        value={option}
                        onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }}
                        placeholder={`Option ${index + 1}`}
                    />
                ))}
            </div>
            <div className="form-group mt-3">
                <label>Correct Option</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={correctOption} 
                    onChange={(e) => setCorrectOption(e.target.value)} 
                    placeholder="Enter the correct option"
                />
            </div>
            <div className="form-group mt-3">
                <label>Set Marks for This Question</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={marks} 
                    onChange={(e) => setMarks(Number(e.target.value))} 
                    min="1"
                />
            </div>
            <div className="form-group mt-3">
                <label>Set Timer (seconds)</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={timerDuration} 
                    onChange={(e) => setTimerDuration(Number(e.target.value))} 
                    min="5"
                />
            </div>
            <div className="mt-4">
                <button onClick={handleSaveQuestion} className="btn btn-primary">
                    Save Question
                </button>
                <button onClick={handleResetFields} className="btn btn-secondary ms-2">
                    Add New Question
                </button>
            </div>
        </div>
    );
};

export default QuizCreator;
