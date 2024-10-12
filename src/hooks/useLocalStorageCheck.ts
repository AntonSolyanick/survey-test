import { useEffect, useState } from "react";

export default (id: number, questionType: string) => {
  const [userInput, setUserInput] = useState<any>("");
  useEffect(() => {
    const storageAnswer = localStorage.getItem(`${id}`);
    if (storageAnswer) {
      (questionType === "simple" || "large" || "singleOption") &&
        setUserInput(String(storageAnswer));
      questionType === "multiOption" && setUserInput(JSON.parse(storageAnswer));
      console.log(questionType);
    }
    if (storageAnswer === null) setUserInput("");
  }, [id]);

  return [userInput, setUserInput];
};
