import useLocalStorageCheck from "../../hooks/useLocalStorageCheck";
import { PartialQuestionProps } from "../../types";
import AnswerButton from "../../UI/AnswerButton";

const LargeQuestion = (props: PartialQuestionProps) => {
  const [userInput, setUserInput] = useLocalStorageCheck(
    props.id!,
    props.questionType!
  );

  return (
    <>
      <div>
        <p className="questionText">{props.question}</p>
        <textarea
          rows={6}
          cols={50}
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value!);
            localStorage.setItem(`${props.id}`, `${e.target.value!}`);
          }}
        ></textarea>
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

export default LargeQuestion;
