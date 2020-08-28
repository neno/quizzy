import React from "react";
import { IQuestion, IAnswer } from "../models.d";
import Answer from "./Answer";

interface Props extends IQuestion {
    toggleAnswer: (id: number) => void;
    showResults: boolean;
}

const isCorrectlyAnswered = (answers: IAnswer[]): boolean => {
    let isCorrect = true;

    answers.forEach((answer) => {
        if (answer.checked !== answer.correct) {
            isCorrect = false;
        }
    });

    return isCorrect;
};

const getQuestionClassNames = (
    showResults: boolean,
    isCorrect: boolean
): string => {
    let questionClassNames = "o-question";
    if (showResults) {
        questionClassNames += ` o-question--${
            isCorrect ? "correct" : "incorrect"
        }`;
    }

    return questionClassNames;
};

const Question: React.FC<Props> = ({
    id,
    questionType,
    title,
    text,
    answers,
    toggleAnswer,
    showResults,
}) => {
    const Correct = () => (
        <span dangerouslySetInnerHTML={{ __html: "&#10003;" }} />
    );
    const Incorrect = () => (
        <span dangerouslySetInnerHTML={{ __html: "&#10005;" }} />
    );

    const isCorrect = isCorrectlyAnswered(answers);

    return (
        <div className={getQuestionClassNames(showResults, isCorrect)}>
            <h3>
                {title}
                {showResults && (isCorrect ? <Correct /> : <Incorrect />)}
            </h3>
            <p>{text}</p>
            <ol>
                {answers.map((answer) => (
                    <li key={answer.id}>
                        <Answer
                            questionId={id}
                            questionType={questionType}
                            id={answer.id}
                            title={answer.title}
                            correct={answer.correct}
                            checked={answer.checked}
                            toggleAnswer={toggleAnswer}
                            showResults={showResults}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Question;
