import React, { memo } from "react";
import { IAnswer } from "../models.d";

interface Props extends IAnswer {
    questionId: number;
    questionType: string;
    toggleAnswer: (id: number) => void;
}

const Answer: React.FC<Props> = memo(
    ({
        id,
        questionId,
        questionType,
        title,
        correct,
        checked,
        toggleAnswer,
    }) => {
        const RadioButton = () => (
            <input
                type="radio"
                name={`answer-${questionId}`}
                id={`answer-${id}`}
                checked={checked}
                onChange={() => toggleAnswer(id)}
            />
        );
        const Checkbox = () => (
            <input
                type="checkbox"
                name={`answer-${id}`}
                id={`answer-${id}`}
                checked={checked}
                onChange={() => toggleAnswer(id)}
            />
        );

        return (
            <label htmlFor={`answer-${id}`}>
                {questionType === "single-choice" ? (
                    <RadioButton />
                ) : (
                    <Checkbox />
                )}
                {title} {correct ? " - (correct)" : " - (incorrect)"}
            </label>
        );
    }
);

export default Answer;
