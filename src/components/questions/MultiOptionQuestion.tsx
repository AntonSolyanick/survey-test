import useLocalStorageCheck from "../../hooks/useLocalStorageCheck";
import { PartialQuestionProps } from "../../types";
import AnswerButton from "../../UI/AnswerButton";

const MultiOptionQuestion = (props: PartialQuestionProps) => {
  const [answers, setAnswers] = useLocalStorageCheck(
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
              type="checkbox"
              checked={answers[`${option}`] || false}
              onChange={(e) => {
                const storageAnswers = localStorage.getItem(`${props.id}`);
                setAnswers({
                  ...JSON.parse(storageAnswers!),
                  [`${option}`]: e.target.checked,
                });
                localStorage.setItem(
                  `${props.id}`,
                  JSON.stringify({
                    ...JSON.parse(storageAnswers!),
                    [`${option}`]: e.target.checked,
                  })
                );
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
        userInput={answers}
      />
    </>
  );
};

export default MultiOptionQuestion;
