const StatisticLine = ({ text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad, all, score }) => {
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={all > 0 ? (score / all).toFixed(2) : 0} />
            <StatisticLine
                text="positive"
                value={all > 0 ? ((good / all) * 100).toFixed(2) + " %" : "0 %"}
            />

        </tbody>
      </table>
      
    </div>
  );
};

export default Statistics;
