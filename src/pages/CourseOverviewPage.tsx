import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Course, Courses } from "../data/models";
import { fetchCourse } from "../data/dataFetch";
import { first, map } from "lodash";

export default function CourseOverviewPage()
{
    const { subject, catalogNo } = useParams();


    const [courseData, setCourseData] = useState<Courses | null>(null);

    useEffect(() => {
        async function fetchData() {
            const subjects = await fetchCourse(subject || "CPT_S", catalogNo || "121");
            setCourseData(subjects);
        }

        fetchData();
    }, []);

    const title = first(courseData?.courses)?.title || "Loading...";

    return <div>
        <h1>{subject} {catalogNo} — {title}</h1>
        { courseData && <CourseTable data={courseData} />}
    </div>
}

interface CourseTableRowProps {
    course: Course;
}

export function CourseTableRow(props: CourseTableRowProps) {
    const { course } = props;

    return <tr>
      <td>{course.year}</td>
      <td>{course.semester}</td>
      <td>{course.campus}</td>
      <td>{course.section}</td>
      <td>{course.course_no}</td>
      <td>{course.instructor || 'N/A'}</td>
      <td>{course.headcount}</td>
      <td>{course.dropped}</td>
      <td>{course.meeting_times || 'N/A'}</td>
    </tr>
}
  
interface CourseTableProps {
    data: Courses;
}
  
export function CourseTable( props: CourseTableProps ) {
    const { data } = props;

    return <table className="table table-striped table-bordered">
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
          <th>Meeting Times</th>
        </tr>
      </thead>
      <tbody>
        {map(data.courses, (course, index) => (
          <CourseTableRow key={index} course={course} />
        ))}
      </tbody>
    </table>
}