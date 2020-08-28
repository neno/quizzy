import React, { useReducer } from "react";
import reducer, { INITIAL_STATE } from "../reducer";
import useFetch from "../useFetch";
import { apiEndpoint } from "../config";
import Question from "./Question";
import { TOGGLE_ANSWER } from "../models.d";

const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    useFetch(apiEndpoint, dispatch);

    const toggleAnswer = (id: number): void => {
        dispatch({
            type: TOGGLE_ANSWER,
            payload: { id },
        });
    };

    if (state.error) {
        return <div>{state.error}</div>;
    }

    return state && state.quiz ? (
        <article>
            <h1>{state.quiz.title}</h1>
            <ul>
                {state.quiz.questions.map((question) => (
                    <li key={question.id}>
                        <Question
                            id={question.id}
                            questionType={question.questionType}
                            title={question.title}
                            text={question.text}
                            answers={question.answers}
                            toggleAnswer={toggleAnswer}
                        />
                    </li>
                ))}
            </ul>
        </article>
    ) : (
        <div>Loading…</div>
    );
};

export default App;
