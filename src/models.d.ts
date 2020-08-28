export interface IState {
    quiz: IQuiz | null;
    loading: boolean;
    error: string | null;
}

export interface IQuiz {
    title: string;
    questions: IQuestion[];
    results: IResult[];
}

export interface IQuestion {
    id: number;
    title: string;
    text: string;
    questionType: typeof QuestionType;
    answers: IAnswer[];
}

export type QuestionType = "multiple-choice" | "single-choice";

export interface IAnswer {
    id: number;
    title: string;
    correct: boolean;
    checked?: boolean;
}

export interface IResult {
    [key: number]: string;
}

export interface IApiData {
    quiz: IQuiz;
}

export const TOGGLE_ANSWER = "TOGGLE_ANSWER";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_RESPONSE_COMPLETE = "FETCH_RESPONSE_COMPLETE";
export const FETCH_ERROR = "FETCH_ERROR";

export type QuizAction =
    | { type: typeof TOGGLE_ANSWER; payload: { id: number } }
    | { type: typeof FETCH_LOADING }
    | { type: typeof FETCH_RESPONSE_COMPLETE; payload: { result: IApiData } }
    | { type: typeof FETCH_ERROR; payload: { error: string } };
