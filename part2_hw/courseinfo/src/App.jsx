import Course from './components/Course'

// // Header Component
// const Header = (props) => {
//   return  <header><h1>{props.course.name}</h1></header>
// }

// // Part Component (for each part in Content)
// const Part = (props) => {
//   return (
//     <div>
//       <p>
//         {props.part.name} {props.part.exercises}
//       </p>
//     </div>
//   )
// }

// // Content Component (manually rendering each part)
// const Content = (props) => {
//   return (
//     <main>
//       <Part part={props.course.parts[0]}/>
//       <Part part={props.course.parts[1]}/>
//       <Part part={props.course.parts[2]}/>
//     </main>
//   )
// }

// // Total Component
// const Total = (props) => {
//   return (
//     <footer>
//       <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
//     </footer>
//   )
// }

// App Component
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return <Course course={course} />
}

export default App