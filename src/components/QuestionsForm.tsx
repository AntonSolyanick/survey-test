import { useEffect, useState } from "react";

import SimpleQuestion from "./questions/SimpleQuestion";
import MultiOptionQuestion from "./questions/MultiOptionQuestion";
import LargeQuestion from "./questions/LargeQuestion";
import questions from "../dev-data/qustions";
import SingleOptionQuestion from "./questions/SingleOptionQuestion";
import { Answer } from "../types";
import Timer from "./Timer";

const QuestionsForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [isTimeLeft, setIsTimeLeft] = useState(true);

  useEffect(() => {
    setCurrentQuestion(Number(localStorage.getItem("currentQuestion"))!);
  }, []);

  const currentQuestionHandler = () => {
    setCurrentQuestion((prevState: number) => {
      if (currentQuestion === questions.length - 1) return prevState;
      localStorage.setItem("currentQuestion", String(prevState + 1));
      return prevState + 1;
    });
  };

  const userAnswerHandler = (answer: Answer) => {
    console.log(userAnswers);
    if (currentQuestion === questions.length - 1) return;
    setUserAnswers((prevState: Answer[]) => [...prevState, answer]);
  };

  let background = {};

  return (
    <>
      <form className="questionForm">
        <Timer setIstimeLeft={setIsTimeLeft}></Timer>
        {isTimeLeft &&
          questions.map((question, i) => {
            if (i === currentQuestion) background = { background: "red" };
            if (i > currentQuestion) background = { background: "gray" };
            if (i < currentQuestion) background = { background: "green" };

            return (
              <span className="bar" style={background} key={question.id}></span>
            );
          })}
        {isTimeLeft && questions[currentQuestion].questionType === "simple" && (
          <SimpleQuestion
            id={questions[currentQuestion].id}
            questionType={questions[currentQuestion].questionType}
            question={questions[currentQuestion].question}
            userAnswerHandler={userAnswerHandler}
            currentQuestionHandler={currentQuestionHandler}
          />
        )}
        {isTimeLeft && questions[currentQuestion].questionType === "large" && (
          <LargeQuestion
            id={questions[currentQuestion].id}
            questionType={questions[currentQuestion].questionType}
            question={questions[currentQuestion].question}
            userAnswerHandler={userAnswerHandler}
            currentQuestionHandler={currentQuestionHandler}
          />
        )}
        {isTimeLeft &&
          questions[currentQuestion].questionType === "multiOption" && (
            <MultiOptionQuestion
              id={questions[currentQuestion].id}
              questionType={questions[currentQuestion].questionType}
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options!}
              userAnswerHandler={userAnswerHandler}
              currentQuestionHandler={currentQuestionHandler}
            />
          )}
        {isTimeLeft &&
          questions[currentQuestion].questionType === "singleOption" && (
            <SingleOptionQuestion
              id={questions[currentQuestion].id}
              questionType={questions[currentQuestion].questionType}
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options!}
              userAnswerHandler={userAnswerHandler}
              currentQuestionHandler={currentQuestionHandler}
            />
          )}

        {!isTimeLeft && (
          <>
            <h2>Время закончилось!</h2>
            <button
              className="button sendButton"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                window.location.reload();
              }}
            >
              Начать тестирование заново
            </button>
          </>
        )}
        {currentQuestion === questions.length - 1 && isTimeLeft && (
          <>
            <button
              className="button sendButton"
              type="submit"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Отправить ответы
            </button>
            <p className="warningText">
              <em>После отправки ответов начнется повторное тестирование!!!</em>
            </p>
          </>
        )}
      </form>
    </>
  );
};

export default QuestionsForm;
