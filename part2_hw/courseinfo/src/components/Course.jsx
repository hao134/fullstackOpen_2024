// Part Component (for each part in Content)
const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <div>
      <p> {name} {exercises}</p>
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
    </div>
  );
};

export default Course;
