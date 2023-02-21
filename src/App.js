import { useState } from "react"
import { questions } from "./questions"

export default function App() {
    const [ currentQuestion, setCurrentQuestion ] = useState(0);
    const [ answered, setAnswered ] = useState(false);
    const [ isCorrect, setIsCorrect ] = useState(false);
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
            }else {
                setIsCorrect(false);
            }

            // show the 'Next' button and disable the 'Submit' button (or replace it?)
            setAnswered(true);
        }
    };

    const clickNext = (event) => {
        event.preventDefault();

        // move to the next question
            // need to add logic for what to do when we're on the last question
        setCurrentQuestion(currentQuestion => currentQuestion + 1);

        // set all the stylings, checked radio's, etc back to their defaults
        setIsCorrect(false);
        setAnswered(false);
        setSelectedAnswer('');
    };

    return (
        <main className="grid h-full place-items-center mt-8 border-2">
            <h1 className="font-bold text-2xl mb-4">Name of Quiz</h1>
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
        </main>
    );
}