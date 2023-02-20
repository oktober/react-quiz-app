import React, { Component } from "react"
import Answer from "./components/Answer"
import Question from "./components/Question"
import { questions } from "./questions"

class App extends Component {
    state = {
        finished: false
    }

    render() {
        let question = questions[0];

        return (
            <>
            <h1 className="font-bold text-2xl">Name of Quiz</h1>
            { this.state.finished ? <Answer /> : <Question question={question} /> }
            </>
        );
    };
}

export default App