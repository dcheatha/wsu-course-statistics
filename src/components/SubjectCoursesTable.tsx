import { isNil, join, map } from "lodash";
import { SubjectCourse, SubjectCourses } from "../data/models";
import { Link } from "react-router-dom";
import { dropRate } from "../util";

export interface SubjectCoursesTableProps {
  data: SubjectCourses | null;
}

export function SubjectCoursesTable(props: SubjectCoursesTableProps) {
  if (isNil(props.data)) {
    return <></>;
  }

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Catalog No</th>
          <th>Title(s)</th>
          <th>Total Headcount</th>
          <th>Total Dropped</th>
          <th>Drop Rate</th>
          <th>Campuses</th>
        </tr>
      </thead>
      <tbody>
        {map(props.data.courses, (course, index) => (
          <SubjectCoursesRow key={index} course={course} />
        ))}
      </tbody>
    </table>
  );
}

export function SubjectCoursesRow(props: { course: SubjectCourse }) {
  const { course } = props;
  return (
    <tr>
      <td>
        <Link to={`/course/${course.subject}/${course.catalog_no}`}>
          {course.catalog_no}
        </Link>
      </td>
      <td>
        <Link to={`/course/${course.subject}/${course.catalog_no}`}>
          {join(course.titles, ", ")}
        </Link>
      </td>
      <td>{course.total_headcount}</td>
      <td>{course.total_dropped}</td>
      <td>{dropRate(course.total_headcount, course.total_dropped)}</td>
      <td>{join(course.campuses, ", ")}</td>
    </tr>
  );
}
