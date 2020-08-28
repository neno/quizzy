import React, { useReducer } from "react";
import reducer, { INITIAL_STATE } from "../reducer";
import useFetch from "../useFetch";
import { apiEndpoint } from "../config";

const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    useFetch(apiEndpoint, dispatch);

    if (state.error) {
        return <div>{state.error}</div>;
    }

    return state.quiz ? (
        <div>{JSON.stringify(state.quiz, null, 2)}</div>
    ) : (
        <div>Loading…</div>
    );
};

export default App;
