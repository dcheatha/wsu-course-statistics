import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchSubjectCourses, fetchSubjects } from '../data/dataFetch';
import { SubjectCourse, SubjectCourses } from '../data/models';
import _, { isNil, join, map } from 'lodash';

export default function SubjectOverviewPage()
{
    const { subject } = useParams();
    const [subjectCourseData, setSubjectCourseData] = useState<SubjectCourses | null>(null);

    useEffect(() => {
        async function fetchData() {
            const subjects = await fetchSubjectCourses(subject || "CPT_S");
            setSubjectCourseData(subjects);
        }

        fetchData();
    }, []);


    return (
        <div>
            <h1>
                Overview for Subject {subject}
            </h1>
            <SubjectCoursesTable data={subjectCourseData}/>
        </div>
    )
}

  
interface SubjectCoursesTableProps {
    data: SubjectCourses | null;
}

function SubjectCoursesTable( props: SubjectCoursesTableProps ) {
    if ( isNil( props.data ) ) {
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
            <th>Campuses</th>
          </tr>
        </thead>
        <tbody>
          {map(props.data.courses, ((course, index) => (
            <SubjectCoursesRow key={index} course={course} />
          )))}
        </tbody>
      </table>
    );
};


function SubjectCoursesRow(props: { course: SubjectCourse }) {
    const { course } = props;
    return (
      <tr>
        <td>{course.catalog_no}</td>
        <td>{join(course.titles, ', ')}</td>
        <td>{course.total_headcount}</td>
        <td>{course.total_dropped}</td>
        <td>{join(course.campuses, ', ')}</td>
      </tr>
    );
};