import { useState } from "react"
import { questions } from "./questions"

export default function App() {
    const [ finishedQuiz, setFinishedQuiz ] = useState(false);
    const [ currentQuestion, setCurrentQuestion ] = useState(0);
    const [ answered, setAnswered ] = useState(false);
    const [ isCorrect, setIsCorrect ] = useState(false);
    const [ numberCorrect, setNumberCorrect ] = useState(0);
    const [ selectedAnswer, setSelectedAnswer ] = useState('');

    const question = questions[currentQuestion];

    const answerInputs = Object.entries(question.answers).map( (value) => {
        return (
            <div key={value[0]} className="mt-2">
                <input 
                    type="radio" 
                    value={value[0]} 
                    name="answer" 
                    id={value[0]} 
                    checked={selectedAnswer === value[1]} 
                    onChange={() => setSelectedAnswer(value[1])}
                />
                <label htmlFor={value[0]} className="ml-4">{value[1]}</label>
            </div>
        )
    });

    const explanation = questions[currentQuestion].explanation;

    const onSubmit = (event) => {
        event.preventDefault();

        const chosenAnswer = event.target.answer.value;
        if (chosenAnswer === '') {
            alert('Please select an answer');
        } else {
            // check if it's the right answer
            const chosenAnswerText = chosenAnswer + '_correct';
            const answeredCorrectly = questions[currentQuestion].correct_answers[chosenAnswerText];

            // show a message based on whether it's right or wrong
            if (answeredCorrectly === 'true'){
                setIsCorrect(true);
                setNumberCorrect(numberCorrect => numberCorrect + 1);
            }else {
                setIsCorrect(false);
            }

            // show the 'Next' button and disable the 'Submit' button (or replace it?)
            setAnswered(true);
        }
    };

    const clickNext = (event) => {
        event.preventDefault();

        // set all the stylings, checked radio's, etc back to their defaults
        setIsCorrect(false);
        setAnswered(false);
        setSelectedAnswer('');

        // move to the next question or show the results (if finished)
        const nextQuestionId = currentQuestion + 1;
        if (nextQuestionId >= questions.length) {
            setFinishedQuiz(true);
        } else {
            setCurrentQuestion(currentQuestion => currentQuestion + 1);
        }
    };

    const Question = () => {
        return (
            <article>
                <h2 className="font-semibold text-xl">Question #{question.id}</h2>

                <legend className="text-l mt-2">{ question.question }</legend>
                <form onSubmit={onSubmit}>

                { answerInputs }

                { answered 
                    ? isCorrect
                        ? <p className="mt-4 text-green-500">Correct!</p>
                        : <p className="mt-4"><span className="text-red-700">Incorrect</span> - {explanation}</p>
                    : '' }

                {
                    answered 
                    ? <button onClick={clickNext} className="bg-slate-300 p-2 my-6 rounded-lg font-bold">Next Question</button> 
                    : <button type="submit" name="submit" className="bg-slate-300 p-2 my-6 rounded-lg font-bold">Submit</button>
                }
                
                </form>
            </article>
        );
    };

    const Results = () => {
        const percentage = Math.round((numberCorrect / questions.length) * 100);
        return (
            <section className="grid h-full place-items-center">
                <h2 className="text-lg font-bold">{ percentage > 70 ? 'Congrats!' : 'Good effort!' }</h2>
                <p className="mt-2 mb-6">You got {numberCorrect}/{questions.length} ({percentage}%) questions correct</p>
            </section>
        );
    };

    return (
        <main className="grid h-full place-items-center mt-8 border-2">
            <h1 className="font-bold text-2xl mb-4">Name of Quiz</h1>

            { finishedQuiz ? <Results /> : <Question /> }

        </main>
    );
}