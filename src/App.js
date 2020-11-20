import React, { useRef, useState } from "react";

const App = () => {

  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(1);
  const [timerType, setTimerType] = useState("SESSION");
  const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
  const [pause, setPause] = useState(true);
  const starter = useRef(null);

  const onBreakDecreClick = () => {
    setBreakTime(breakTime - 1)
    if (timerType === "BREAK") {
      setTimeLeft((breakTime-1) * 60)
    }
  }
  const onBreakIncreClick = () => {
    setBreakTime(breakTime + 1)
    if (timerType === "BREAK") {
      setTimeLeft((breakTime-1) * 60)
    }
  }
  const onSessDecreClick = () => {
    setSessionTime(sessionTime => sessionTime - 1)
    if (timerType === "SESSION") {
      setTimeLeft((sessionTime -1) * 60)
    }
  }
  const onSessIncreClick = () => {
    setSessionTime(sessionTime => sessionTime + 1)
    if (timerType === "SESSION") {
      setTimeLeft((sessionTime+1) * 60)
    }
  }
  const buzzer = () => {
    const sound = document.getElementById("beep");
    sound.play();
  }
  const changeTime = () => {
    if (timeLeft > 0) {
      setTimeLeft(timeLeft => timeLeft - 1)
    } else if (timeLeft === 0 && timerType === "SESSION") {
      console.log(timerType)
      buzzer()
      setTimeLeft(breakTime * 60)
      setTimerType("BREAK")
    } else if (timeLeft === 0 && timerType === "BREAK") {
      buzzer()
      setTimeLeft(sessionTime * 60)
      setTimerType("SESSION")
    }
  }
  const startTimer = () => {
    console.log(timerType)
    starter.current =  setInterval(changeTime, 100)
    setPause(false);
  }
    const stopTimer = () => {
    clearInterval(starter.current)
    setPause(true)
  }
  const onResetClick = () => {
    stopTimer()
    setBreakTime(5)
    setSessionTime(25)
    setTimerType("SESSION")
    setTimeLeft(1500)
  }
  const onChangePause = () => {
    console.log(sessionTime, breakTime, timeLeft)
    if (pause) {
      startTimer()
    } else {
      stopTimer()
    }
  }
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
  }
  return (
    <div id='clock'>
      <h1>🍅Pomodoro Clock🍅</h1>
      <div>
        <h5>BREAK LENGTH</h5>
        <input
          onClick={onBreakDecreClick}
          type="button" value="-" />
        <h4>{breakTime}</h4>
        <input
          onClick={onBreakIncreClick}
          type="button" value="+" />
      </div>
      <div>
        <h5>SESSION LENGTH</h5>
        <input
          onClick={onSessDecreClick}
          type="button" value="-" />
        <h4>{sessionTime}</h4>
        <input
          onClick={onSessIncreClick}
          type="button" value="+" />
      </div>
      <div className="session-section">
        <div>
          <h3>{timerType}</h3>
          <h4>{toMMSS(timeLeft)}</h4>
          <button
            onClick={onChangePause} id="start-pause">{pause ? "START" : "PAUSE"}</button>
          <button onClick={onResetClick} id="reset">RESET</button>
        </div>
      </div>
      <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
  )
}

export default App;
