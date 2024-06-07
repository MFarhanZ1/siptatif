import { useState, useEffect } from "react";

interface TimerProps {
  timerMinutes: number;
  onComplete: () => void;
}

const Timer = ({ timerMinutes, onComplete }: TimerProps) => {
  const [time, setTime] = useState(timerMinutes * 60);

  useEffect(() => {
    // Update the countdown every 1 second
    const countdownInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(countdownInterval);
          onComplete();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(countdownInterval);
  },);

  // Calculate minutes and seconds
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");

  return <span className="font-bold">{`${minutes}:${seconds}`}</span>;
};

export default Timer;
