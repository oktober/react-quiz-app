function Question({ question }) {

    // have to filter the answers to remove null values
    const filledAnswers = {};
    for (const key in question.answers) {
        if (question.answers[key] !== null) {
            filledAnswers[key] = question.answers[key];
        }
    }

    const answerInputs = Object.entries(filledAnswers).map( (value) => {
        return (
            <div key={value[0]}>
                <input type="radio" value={value[0]} name={value[0]} id={value[0]} />
                <label htmlFor={value[0]}>{value[1]}</label>
            </div>
        )
    });

    return (
        <article>
            <h2 className="font-semibold text-xl">Question #{question.id}</h2>

            <legend className="text-l">{ question.question }</legend>

            { answerInputs }
        </article>
    );
}
 
export default Question;