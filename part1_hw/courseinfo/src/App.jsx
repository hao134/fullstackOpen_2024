// Header Component
const Header = (props) => {
  return  <header><h1>{props.course}</h1></header>
}

// Part Component (for each part in Content)
const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

// Content Component (manually rendering each part)
const Content = ({ part1, exercise1, part2, exercise2, part3, exercise3 }) => {
  return (
    <main>
      <Part name={part1} exercises={exercise1}/>
      <Part name={part2} exercises={exercise2}/>
      <Part name={part3} exercises={exercise3}/>
    </main>
  )
}

// Total Component
const Total = ({ exercises1, exercises2, exercises3 }) => {
  return (
    <footer>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </footer>
  )
}

// App Component
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content 
        part1={part1}
        exercise1={exercises1}
        part2={part2}
        exercise2={exercises2}
        part3={part3}
        exercise3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  )
}

export default App