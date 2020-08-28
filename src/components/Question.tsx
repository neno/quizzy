import React from "react";
import { IQuestion } from "../models.d";
import Answer from "./Answer";

interface Props extends IQuestion {
    toggleAnswer: (id: number) => void;
}

const Question: React.FC<Props> = ({
    id,
    questionType,
    title,
    text,
    answers,
    toggleAnswer,
}) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>{text}</p>
            <ul>
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
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Question;
