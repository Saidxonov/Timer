import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [clockMinutes, setClockMinutes] = useState(0);
  const [clockSeconds, setClockSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function handleChangeMinutes(e) {
    setInputMinutes(e.currentTarget.value);
    console.log(inputMinutes);
  }

  function handleChangeSeconds(e) {
    setInputSeconds(e.currentTarget.value);
    console.log(inputSeconds);
  }

  useEffect(
    function () {
      if (!isRunning) {
        return;
      }

      if (clockMinutes == 0 && clockSeconds == 0) return;

      const interval = setInterval(function () {
        setClockSeconds((prevClockSeconds) => {
          if (prevClockSeconds > 0) return prevClockSeconds - 1;
          if (prevClockSeconds == 0 && clockMinutes > 0) return 59;
          return 0;
        });

        setClockMinutes((prevClockMinutes) => {
          if (clockSeconds == 0) return prevClockMinutes - 1;
          return prevClockMinutes;
        });
      }, 1000);

      return () => clearInterval(interval);
    },
    [isRunning, clockMinutes, clockSeconds]
  );

  function handleStartClick(e) {
    e.preventDefault();
    const mins = Number(inputMinutes);
    const secs = Number(inputSeconds);

    if (mins == 0 && secs == 0) {
      alert("Iltimos Vaqtni Kiriting");
      return;
    }

    if (mins < 0 || secs < 0) {
      alert("Vaqt 0dan Kichik Bolmasligi Kerak");
      return;
    }

    if (secs > 60) {
      setClockMinutes(mins + Math.floor(secs / 60));
      setClockSeconds(secs % 60);
    } else {
      setClockMinutes(mins);
      setClockSeconds(secs);
    }

    setInputMinutes(0);
    setInputSeconds(0);
    setIsRunning(true);
  }

  function handlePauseResumeClick(e) {
    e.preventDefault();
    setIsRunning((prev) => !prev);
  }

  function handleResetClick(e) {
    e.preventDefault();
    setInputMinutes(0);
    setInputSeconds(0);
    setClockMinutes(0);
    setClockSeconds(0);
    setIsRunning(false);
  }

  const clock = `${
    String(clockMinutes).length == 1 ? `0${clockMinutes}` : clockMinutes
  }:${String(clockSeconds).length == 1 ? `0${clockSeconds}` : clockSeconds}`;

  return (
    <>
      <div className="container">
        <div className="top-content">
          <h2>2.masala</h2>
          <h1>Timer</h1>
        </div>
        <div className="form">
          <form>
            <input
              value={inputMinutes}
              onChange={handleChangeMinutes}
              type="number"
              id="minutes"
              placeholder="Enter Minutes"
            />
            <input
              value={inputSeconds}
              onChange={handleChangeSeconds}
              type="number"
              id="seconds"
              placeholder="Enter Seconds"
            />
            <button onClick={handleStartClick} className="start">
              Start
            </button>
          </form>
          <div className="result-of-timer">
            <h1>{clock}</h1>
          </div>
          <div className="buttons">
            <button onClick={handlePauseResumeClick} className="pause">
              Pause/Resume
            </button>
            <button onClick={handleResetClick} className="reset">
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
