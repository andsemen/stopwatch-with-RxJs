import { useState, useEffect } from 'react';
import { format, addSeconds } from 'date-fns';
import { fromEvent, interval, debounceTime, filter, buffer, map } from 'rxjs';
import styles from "./stopwatch.module.scss"
import StopwatchBtns from '../StopwatchBtns';



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



  const waitHandler = ({ target }) => {

    const clickEvent = fromEvent(target, 'click')

    const doubleClick = clickEvent.pipe(
      buffer(clickEvent.pipe(
        debounceTime(300),
      )),
      map(list => {
        return list.length;
      }),
      filter(x => x === 2),
    )

    doubleClick.subscribe(() => {
      setIsOn(false)
    })
  }


  const resetHandler = () => {
    setTime(new Date(0, 0, 0))
    setIsOn(true)
  }



  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Stopwatch</h1>
      <div className={styles.timer}> 
      {format(time, 'HH:mm:ss')}
      </div>

      <StopwatchBtns startStopHandler={startStopHandler} isOn={isOn} waitHandler={waitHandler} resetHandler={resetHandler} />

    </div>
  );
}

export default Stopwatch;
