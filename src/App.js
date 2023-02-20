import { useState } from "react"
import { questions } from "./questions"

function App() {
    const [ currentQuestion, setCurrentQuestion ] = useState(0);

    const question = questions[currentQuestion];

    const answerInputs = Object.entries(question.answers).map( (value) => {
        return (
            <div key={value[0]} className="mt-2">
                <input type="radio" value={value[0]} name="answer" id={value[0]} />
                <label htmlFor={value[0]} className="ml-4">{value[1]}</label>
            </div>
        )
    });

    return (
        <main className="grid h-full place-items-center mt-8 border-2">
            <h1 className="font-bold text-2xl mb-4">Name of Quiz</h1>
            <article>
                <h2 className="font-semibold text-xl">Question #{question.id}</h2>

                <legend className="text-l mt-2">{ question.question }</legend>

                { answerInputs }

                <button className="bg-slate-300 p-2 my-6 rounded-lg font-bold">Submit</button>
            </article>
        </main>
    );
}

export default App