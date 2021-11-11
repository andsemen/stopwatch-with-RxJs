import cx from "classnames"
import styles from './stopwatchbtns.module.scss'


const StopwatchBtns = (props) => {

  const { startStopHandler, isOn, waitHandler, resetHandler } = props

  const startStopStyles = {
    [styles.start]: !isOn,
    [styles.stop]: isOn
  }


  return (

    <div className={styles.btnRow}>

      <button className={cx(styles.btn, startStopStyles)} onClick={startStopHandler}>  {isOn ? "Stop" : "Start"} </button>
      <button className={cx(styles.btn, styles.wait)} onClick={waitHandler}>Wait</button>
      <button className={cx(styles.btn, styles.reset)} onClick={resetHandler}>Reset</button>

    </div>


  );
}

export default StopwatchBtns;
