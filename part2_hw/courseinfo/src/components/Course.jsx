// Part Component (for each part in Content)
const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <div>
      <p>
        {name} {exercises}
      </p>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <strong>
        Number of exercises{" "}
        {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
      </strong>
    </div>
  );
};

export default Course;
