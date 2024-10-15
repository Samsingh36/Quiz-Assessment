# Quiz Assessment Project

The **BrightChamps Quiz Assessment** is a dynamic web application that allows users to create custom quizzes, take quizzes, and track scores. Built using **React.js** for the frontend, the app provides a seamless experience for quiz creation, question management, and real-time scoring.

## Features

- **Create Quiz**: Allows users to create a new quiz with custom questions.
- **Start Quiz**: Users can start the quiz if questions are available.
- **Quiz Timer**: Each question comes with a timer to enhance the quiz experience.
- **Track Score**: Displays the user's score at the end of the quiz.
- **Reset Quiz**: Resets the quiz for users to create a new one after completion.
- **Responsive UI**: The app is optimized for both desktop and mobile views.

## Technologies Used

- **React.js**: For building the frontend.
- **Bootstrap**: For a responsive and modern UI.
- **JavaScript**: Core language for handling application logic.
- **LocalStorage**: Used to store quiz data and progress locally.

## Components

1. **Quiz Creator**: Allows users to create and save custom questions for the quiz.
2. **Questions**: Displays the quiz questions with options and a timer for each.
3. **Score**: Shows the user's score after the quiz is completed.

## How It Works

1. **Create Quiz**: Navigate to the "Create New Quiz" page and add custom questions with multiple options.
2. **Start Quiz**: After saving the questions, click "Start New Quiz" to begin.
3. **Answer Questions**: Each question will be displayed with a set of options for the user to select an answer.
4. **View Score**: Once the quiz is completed, the total score will be displayed on the screen.
5. **Reset Quiz**: Users can reset the quiz to create and take a new one after completing the previous quiz.

## Installation & Setup

### Prerequisites:
- Node.js and npm installed

### Installation Steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/Samsingh36/Quiz-Assessment-Project.git
    cd Quiz-Assessment-Project
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the app:
    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:3000` to access the app.

## Project Structure

- **App.js**: The main file that handles routing and the state for the quiz.
- **QuizCreator.js**: Component for creating and saving quiz questions.
- **Questions.js**: Displays the quiz and handles user answers.
- **Score.js**: Shows the final score after completing the quiz.

## Styling

The application uses **Bootstrap** for responsive layouts and additional custom CSS for visual enhancements.

## License

© 2024 Samar Pratap Singh. All rights reserved.

This project and its contents, including code and documentation, are the intellectual property of **Samar Pratap Singh**.


