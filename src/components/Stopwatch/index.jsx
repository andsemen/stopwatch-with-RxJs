import { useState, useEffect } from 'react';
import { format, addSeconds } from 'date-fns';
import { fromEvent, interval, debounceTime, filter, buffer, map } from 'rxjs';



const Stopwatch = () => {

  const [time, setTime] = useState(new Date(0, 0, 0))
  const [isOn, setIsOn] = useState(false)

  useEffect(() => {

    const timer = interval(1000)
      .subscribe(() => {
        if (isOn) {
          setTime((time) => addSeconds(time, 1))
        }
      })

    return () => timer.unsubscribe()
  }, [isOn]);

  const startStopHandler = () => {
    
    if (isOn) {
      setTime(new Date(0, 0, 0))
    }

    setIsOn(!isOn)
  }





  return (
    <article>
      <h1>{format(time, 'HH:mm:ss')}</h1>
      <button onClick={startStopHandler}>  {isOn ? "Stop" : "Start"} </button>

    </article>
  );
}

export default Stopwatch;
