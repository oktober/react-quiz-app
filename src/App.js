import { useState } from "react"
import Question from "./components/Question";
import Results from "./components/Results";

export default function App() {
    const [ finishedQuiz, setFinishedQuiz ] = useState(false);
    const [ numberCorrect, setNumberCorrect ] = useState(0);

    return (
        <main className="grid h-full place-items-center mt-8 border-2">
            <h1 className="font-bold text-2xl mb-4">Name of Quiz</h1>

            { 
            finishedQuiz 
                ? <Results numberCorrect={numberCorrect} /> 
                : <Question setNumberCorrect={setNumberCorrect} setFinishedQuiz={setFinishedQuiz} /> 
            }

        </main>
    );
};