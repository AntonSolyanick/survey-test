import { AnswerButtonProps } from "../types";
const AnswerButton = (props: AnswerButtonProps) => {
  return (
    <button
      className="button"
      onClick={(e) => {
        e.preventDefault();

        props.userAnswerHandler!({
          id: `${props.id}`,
          answer: `${props.userInput}`,
        });
        props.currentQuestionHandler();
      }}
    >
      Ответить
    </button>
  );
};

export default AnswerButton;
