import React from 'react';
import { useNavigate } from 'react-router-dom';

const Score = ({ score, setScore, setCurrentQuestion, setQuizStarted, setTimer, handleQuizCompletion }) => {
    const navigate = useNavigate();

    const handleFinish = () => {
        handleQuizCompletion();
        setCurrentQuestion(0);
        setTimer(60);
        setScore(0);
        navigate('/');
    };

    const getCongratulatoryMessage = () => {
        if (score === 0) {
            return "Don't worry! You can always try again!";
        } else if (score <= 1) {
            return "Good try! A little more practice will help.";
        } else if (score <= 2) {
            return "Well done! You're getting the hang of it.";
        } else if (score <= 4) {
            return "Great job! You're really improving!";
        } else {
            return "Outstanding! You're a quiz master!";
        }
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    };

    const cardStyle = {
        maxWidth: '600px',
        background: 'white',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
    };

    const titleStyle = {
        color: '#343a40',
        fontSize: '2.5rem',
        marginBottom: '15px',
    };

    const scoreTextStyle = {
        fontSize: '1.8rem',
        color: '#28a745',
        marginBottom: '20px',
    };

    const congratulatoryMessageStyle = {
        fontSize: '1.5rem',
        color: '#6f42c1',
        margin: '15px 0',
        fontWeight: 'bold',
    };

    const thankYouTextStyle = {
        fontSize: '1.3rem',
        color: '#555',
        margin: '10px 0',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        border: 'none',
        padding: '12px 25px',
        fontSize: '1.2rem',
        borderRadius: '5px',
        cursor: 'pointer',
        color: 'white',
        transition: 'background-color 0.3s ease',
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h5 style={titleStyle}>Quiz Completed!</h5>
                <h3 style={scoreTextStyle}>Your Score: {score}</h3>
                <p style={congratulatoryMessageStyle}>{getCongratulatoryMessage()}</p>
                <p style={thankYouTextStyle}>Thank you for participating!</p>
                <button 
                    style={buttonStyle} 
                    onClick={handleFinish}
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Score;
