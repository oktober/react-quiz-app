import React, { Component } from "react"
import Answer from "./components/Answer"
import Question from "./components/Question"

class App extends Component {
    state = {
        finished: false
    }

    render() {
        return (
            <>
            <h1 className="font-bold text-2xl">Name of Quiz</h1>
            {this.state.finished ? <Answer /> : <Question />}
            </>
        );
    };
}

export default App