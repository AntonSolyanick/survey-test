import { useRef, useState, useEffect } from "react";

import { TimerProps } from "../types";

const Timer = (props: TimerProps) => {
  const Ref = useRef("");
  const timeLeft = localStorage.getItem("timeLeft") || "02:00";
  useEffect(() => {
    // const timeLeft = localStorage.getItem("timeLeft");
    //if (timeLeft) setTimer(timeLeft);
    clearTimer(getDeadTime());
  }, []);

  const [timer, setTimer] = useState(timeLeft);

  const setTimerHandler = (time: any) => {
    setTimer(time);
    localStorage.setItem("timeLeft", time);
  };

  const getTimeRemaining = (e: any) => {
    const total = Date.parse(e) - Date.parse(String(new Date()));
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimerHandler(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
      setTimerHandler(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e: any) => {
    //setTimerHandler("02:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = String(id);
  };

  const getDeadTime = () => {
    let deadline = new Date();
    const timeLeft = localStorage.getItem("timeLeft");
    if (timeLeft) {
      const timeLeftArray = timeLeft.split(":");

      const seconds = +timeLeftArray[0] * 60 + +timeLeftArray[1];
      deadline.setSeconds(deadline.getSeconds() + seconds);

      return deadline;
    }
    deadline.setSeconds(deadline.getSeconds() + 120);

    return deadline;
  };

  if (timer === "00:00") {
    props.setIstimeLeft(false);
  }

  return (
    <h1>
      Тестирование <span className="timerContainer">{timer}</span>
    </h1>
  );
};

export default Timer;
