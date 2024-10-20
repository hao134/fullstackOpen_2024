import { useState } from "react";
import Statistics from "./Statistics";
import './App.css'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [score, setScore] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(all + 1);
    setScore(score + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setScore(score + 0);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setScore(score - 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        score={score}
      />
    </div>
  );
};

export default App;
