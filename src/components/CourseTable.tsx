import { map } from "lodash";
import { Course, Courses } from "../data/models";
import { dropRate } from "../util";

export interface CourseTableProps {
  data: Courses;
}

export function CourseTable(props: CourseTableProps) {
  const { data } = props;

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Year</th>
          <th>Semester</th>
          <th>Campus</th>
          <th>Section</th>
          <th>Course No</th>
          <th>Instructor</th>
          <th>Headcount</th>
          <th>Dropped</th>
          <th>Drop Rate</th>
          <th>Meeting Times</th>
        </tr>
      </thead>
      <tbody>
        {map(data.courses, (course, index) => (
          <CourseTableRow key={index} course={course} />
        ))}
      </tbody>
    </table>
  );
}

export interface CourseTableRowProps {
  course: Course;
}

export function CourseTableRow(props: CourseTableRowProps) {
  const { course } = props;

  return (
    <tr>
      <td>{course.year}</td>
      <td>{course.semester}</td>
      <td>{course.campus}</td>
      <td>{course.section}</td>
      <td>{course.course_no}</td>
      <td>{course.instructor || "N/A"}</td>
      <td>{course.headcount}</td>
      <td>{course.dropped}</td>
      <td>{dropRate(course.headcount, course.dropped)}</td>
      <td>{course.meeting_times || "N/A"}</td>
    </tr>
  );
}
