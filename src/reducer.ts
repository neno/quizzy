import {
    QuizAction,
    IState,
    FETCH_LOADING,
    FETCH_ERROR,
    FETCH_RESPONSE_COMPLETE,
    TOGGLE_ANSWER,
    IQuiz,
} from "./models.d";

export const INITIAL_STATE: IState = {
    quiz: null,
    loading: true,
    error: null,
};

const mapResult = (data: IQuiz, answerId?: number) => {
    return {
        ...data,
        questions: data.questions.map((question) => {
            return {
                ...question,
                answers: question.answers.map((answer) => ({
                    ...answer,
                    checked:
                        answerId && answerId === answer.id
                            ? !answer.checked
                            : answer.checked || false,
                })),
            };
        }),
    };
};

const reducer = (state = INITIAL_STATE, action: QuizAction): IState => {
    if (action.type === FETCH_LOADING) {
        return { loading: true, quiz: null, error: null };
    }

    if (action.type === FETCH_ERROR) {
        return {
            loading: false,
            quiz: null,
            error: action.payload.error,
        };
    }

    if (action.type === FETCH_RESPONSE_COMPLETE) {
        const result = mapResult(action.payload.result.quiz);
        return { ...state, quiz: result, loading: false, error: null };
    }

    if (action.type === TOGGLE_ANSWER) {
        if (state.quiz) {
            const quiz = mapResult(state.quiz, action.payload.id);
            return { ...state, quiz };
        }
        return state;
    }

    return state;
};

export default reducer;
