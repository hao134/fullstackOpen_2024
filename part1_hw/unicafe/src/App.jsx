import { useState } from "react";

const Display = (props) => (
  <div>
    {props.text} {props.value}
  </div>
);

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
      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={all} />
      <Display
        text="average"
        value={all > 0 ? (score / all).toFixed(2) : 0}
      />{" "}
      {/* if else to fixed nan problem */}
      <Display
        text="positive"
        value={all > 0 ? ((good / all) * 100).toFixed(2) + " %" : "0 %"}
      />
    </div>
  );
};

export default App;
