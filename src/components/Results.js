import { questions } from "./../questions"

export default function Results({ numberCorrect }) {
    const percentage = Math.round((numberCorrect / questions.length) * 100);

    return (
        <section className="grid h-full place-items-center">
            <h2 className="text-lg font-bold">{ percentage > 70 ? 'Congrats!' : 'Good effort!' }</h2>
            <p className="mt-2 mb-6">You got {numberCorrect}/{questions.length} ({percentage}%) questions correct</p>
        </section>
    );
};