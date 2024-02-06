import './chess-timer.css'
import {useEffect, useRef, useState} from "react";

interface ChessTimerProps {
  initialTime: number;
  color: PieceColor;
  turn: PieceColor;
  loser: PieceColor | null;
  setLoser: (value: PieceColor) => void;
}

export const ChessTimerComponent = ({initialTime, color, turn, loser, setLoser}: ChessTimerProps) => {
  const [time, setTime] = useState(initialTime);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    if (loser && timer.current)
      clearInterval(timer.current)
    else
      startTimer()
  }, [turn, loser])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback = () => {
      if (time <= 0) setLoser(color);
      if (turn === color)
        setTime(prev => prev - 1);
    }
    timer.current = setInterval(callback, 1000)
  }

  const mins = Math.floor(time / 60);
  const secs = time % 60;

  const minsString = mins < 10 ? '0' + mins : mins.toString();
  const secsString = secs < 10 ? '0' + secs : secs.toString();


  return (
    <div className='timerContainer'>
      <span className='timerText'>
        {`${minsString} : ${secsString}`}
      </span>
    </div>
  );
};