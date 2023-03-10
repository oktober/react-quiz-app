import { useState } from "react"

export default function Question({ questions, setNumberCorrect, setFinishedQuiz }) {
    const [ currentQuestionId, setCurrentQuestionId ] = useState(0);
    const [ selectedAnswer, setSelectedAnswer ] = useState('');
    const [ answered, setAnswered ] = useState(false);
    const [ isCorrect, setIsCorrect ] = useState(false);

    const question = questions[currentQuestionId];

    const answerInputs = Object.entries(question.answers).map( (value) => {
        return (
            <div key={value[0]} className="mt-2">
                <input 
                    type="radio" 
                    value={value[0]} 
                    name="answer" 
                    id={value[0]} 
                    checked={selectedAnswer === value[0]} 
                    onChange={() => setSelectedAnswer(value[0])}
                />
                <label htmlFor={value[0]} className="ml-4">{value[1]}</label>
            </div>
        )
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (selectedAnswer === '') {
            alert('Please select an answer');
        } else {
            // check if it's the right answer
            const selectedAnswerText = selectedAnswer + '_correct';
            const answeredCorrectly = questions[currentQuestionId].correct_answers[selectedAnswerText];

            // show a message based on whether it's right or wrong
            if (answeredCorrectly === 'true'){
                setIsCorrect(true);
                setNumberCorrect(numberCorrect => numberCorrect + 1);
            }else {
                setIsCorrect(false);
            }

            // show the 'Next' button instead of the 'Submit' button
            setAnswered(true);
        }
    };

    const handleNextClick = (event) => {
        event.preventDefault();

        // set all the stylings, checked radio's, etc back to their defaults
        setIsCorrect(false);
        setAnswered(false);
        setSelectedAnswer('');

        // move to the next question or show the results (if finished)
        const nextQuestionId = currentQuestionId + 1;
        
        nextQuestionId >= questions.length 
            ? setFinishedQuiz(true) 
            : setCurrentQuestionId(currentQuestionId => currentQuestionId + 1);
    };

    return (
        <article>
            <h2 className="font-semibold text-xl">Question #{question.id}</h2>

            <legend className="text-l mt-2">{ question.question }</legend>
            <form onSubmit={handleSubmit}>

            { answerInputs }

            { 
            answered 
                ? isCorrect
                    ? <p className="mt-4 text-green-500">Correct!</p>
                    : <p className="mt-4"><span className="text-red-700">Incorrect</span> - {question.explanation}</p>
                : '' 
            }

            {
            answered 
                ? <button onClick={handleNextClick} className="bg-slate-300 p-2 my-6 rounded-lg font-bold">Next Question</button> 
                : <button type="submit" name="submit" className="bg-slate-300 p-2 my-6 rounded-lg font-bold">Submit</button>
            }
            
            </form>
        </article>
    );
};