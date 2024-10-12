export type Answer = {
  id: string;
  answer: string | string[];
};

export type AnswerButtonProps = {
  id: number;
  userAnswerHandler: (answer: Answer) => void;
  currentQuestionHandler: () => void;
  userInput: string | string[];
};

export type TimerProps = {
  setIstimeLeft: (setIstimeLeft: boolean) => void;
};

type QuestionProps = {
  id: number;
  questionType: string;
  question: string;
  options: string[];
  userAnswerHandler: (answer: Answer) => void;
  currentQuestionHandler: () => void;
};

export type PartialQuestionProps = Partial<QuestionProps>;
