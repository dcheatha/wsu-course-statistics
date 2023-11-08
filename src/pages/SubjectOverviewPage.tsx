import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchSubjectCourses, fetchAllSubjects } from '../data/dataFetch';
import { SubjectCourses } from '../data/models';
import _ from 'lodash';
import { SubjectCoursesTable } from '../components/SubjectCoursesTable';
import Breadcrumbs from '../components/Breadcrumbs';

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
            <Breadcrumbs subject={subject}/>
            <h1>
                Overview for Subject {subject}
            </h1>
            <SubjectCoursesTable data={subjectCourseData}/>
        </div>
    )
}
