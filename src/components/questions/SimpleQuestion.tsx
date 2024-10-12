import useLocalStorageCheck from "../../hooks/useLocalStorageCheck";
import { PartialQuestionProps } from "../../types";
import AnswerButton from "../../UI/AnswerButton";

const SimpleQuestion = (props: PartialQuestionProps) => {
  const [userInput, setUserInput] = useLocalStorageCheck(
    props.id!,
    props.questionType!
  );

  return (
    <>
      <div>
        <p className="questionText">{props.question}</p>
        <input
          value={userInput as string}
          onChange={(e) => {
            setUserInput(e.target.value!);
            localStorage.setItem(`${props.id}`, `${e.target.value!}`);
          }}
          type="text"
        />
      </div>
      <AnswerButton
        id={props.id!}
        userAnswerHandler={props.userAnswerHandler!}
        currentQuestionHandler={props.currentQuestionHandler!}
        userInput={userInput}
      />
    </>
  );
};

export default SimpleQuestion;
