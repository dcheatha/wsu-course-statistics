import { isNil, join, map } from 'lodash';
import { SubjectCourse, SubjectCourses } from '../data/models';

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
}

export function SubjectCoursesRow(props: { course: SubjectCourse; }) {
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
}
