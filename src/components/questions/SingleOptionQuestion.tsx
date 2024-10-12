import { useEffect, useState } from "react";

import useLocalStorageCheck from "../../hooks/useLocalStorageCheck";
import { PartialQuestionProps } from "../../types";
import AnswerButton from "../../UI/AnswerButton";

const SingleOptionQuestion = (props: PartialQuestionProps) => {
  const [isChecked, setIsChecked] = useLocalStorageCheck(
    props.id!,
    props.questionType!
  );

  return (
    <>
      <div>
        <p className="questionText">{props.question}</p>
        {props.options!.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="radio"
              checked={option === isChecked}
              value={option}
              onChange={(e) => {
                setIsChecked(option);
                localStorage.setItem(`${props.id}`, e.currentTarget.value);
              }}
            />
            {option}
          </label>
        ))}
      </div>
      <AnswerButton
        id={props.id!}
        userAnswerHandler={props.userAnswerHandler!}
        currentQuestionHandler={props.currentQuestionHandler!}
        userInput={isChecked}
      />
    </>
  );
};

export default SingleOptionQuestion;
