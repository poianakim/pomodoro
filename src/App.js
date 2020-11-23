import React, { useRef, useState, useEffect } from "react";

const App = () => {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timerType, setTimerType] = useState("SESSION");
  const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
  const [pause, setPause] = useState(true);
  const starter = useRef(null);

  const changeTime = () => {
    if (timeLeft > 0) {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }
    if (timeLeft === 0) {
      if (timerType === "SESSION") {
        console.log(timeLeft);
        setTimerType("BREAK");
        setTimeLeft(breakTime * 60);
        buzzer();
      } else {
        setTimeLeft(sessionTime * 60);
        setTimerType("SESSION");
        buzzer();
      }
    }
  };
  useEffect(() => {
    if (!pause) {
      const interval = setInterval(changeTime, 1000)
      return () => clearInterval(interval)
    }
  })
  const onBreakDecreClick = () => {
    if (breakTime > 0) {
      setBreakTime(breakTime - 1);
      if (timerType === "BREAK") {
        setTimeLeft((breakTime - 1) * 60);
      }
    } else {
      return;
    }
  };
  const onBreakIncreClick = () => {
    setBreakTime(breakTime + 1);
    if (timerType === "BREAK") {
      setTimeLeft((breakTime + 1) * 60);
    }
  };
  const onSessDecreClick = () => {
    if (sessionTime > 0) {
      setSessionTime((sessionTime) => sessionTime - 1);
      if (timerType === "SESSION") {
        setTimeLeft((sessionTime - 1) * 60);
      }
    } else {
      return;
    }
  };
  const onSessIncreClick = () => {
    setSessionTime((sessionTime) => sessionTime + 1);
    if (timerType === "SESSION") {
      setTimeLeft((sessionTime + 1) * 60);
    }
  };
  const buzzer = () => {
    const sound = document.getElementById("beep");
    sound.play();
  };
  const startTimer = () => {
    console.log(sessionTime, breakTime, timeLeft);
    setPause(false);
  };
  const stopTimer = () => {
    setPause(true);
    clearInterval(starter.current);
  };
  const onResetClick = () => {
    stopTimer();
    setBreakTime(5);
    setSessionTime(25);
    setTimerType("SESSION");
    setTimeLeft(1500);
  };
  const onChangePause = () => {
    if (pause) {
      startTimer();
    } else {
      stopTimer();
    }
  };
  const toMMSS = () => {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft - minutes * 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };
  return (
    <div className="container" id="clock">
      <h1>🍅Pomodoro Clock🍅</h1>
      <div className="row">
        <div className="length">
          <h2>BREAK LENGTH</h2>
          <div className="length-control">
            <input onClick={onBreakDecreClick} type="button" value="-" />
            <h3>{breakTime}</h3>
            <input onClick={onBreakIncreClick} type="button" value="+" />
          </div>
        </div>
        <div className="length">
          <h2>SESSION LENGTH</h2>
          <div className="length-control">
            <input onClick={onSessDecreClick} type="button" value="-" />
            <h3>{sessionTime}</h3>
            <input onClick={onSessIncreClick} type="button" value="+" />
          </div>
        </div>
      </div>
      <div className="session-section">
        <div>
          <h2>{timerType}</h2>
          <h1>{toMMSS(timeLeft)}</h1>
          <div className="timer-buttons">
            <button onClick={onChangePause} id="start-pause">
              {pause ? " START " : " PAUSE "}
            </button>
            <button onClick={onResetClick} id="reset">
              RESET
          </button></div>
        </div>
      </div>
      
        <footer> POIANA KIM &copy;  {new Date().getFullYear()} POMODORO CLOCK </footer>
    
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

export default App;
