const Display = (props) => (
  <div>
    {props.text} {props.value}
  </div>
);

const Statistics = ({ good, neutral, bad, all, score }) => {
  return (
    <div>
      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={all} />
      <Display text="average" value={all > 0 ? (score / all).toFixed(2) : 0} />
      <Display
        text="positive"
        value={all > 0 ? ((good / all) * 100).toFixed(2) + " %" : "0 %"}
      />
    </div>
  );
};

export default Statistics;
