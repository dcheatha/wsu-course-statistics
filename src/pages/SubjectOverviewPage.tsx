import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchSubjectCourses, fetchAllSubjects } from '../data/dataFetch';
import { SubjectCourses } from '../data/models';
import _, { first, map, size, truncate } from 'lodash';
import { SubjectCoursesTable } from '../components/SubjectCoursesTable';
import Breadcrumbs from '../components/Breadcrumbs';
import { EnrollemntTreeMap } from './EnrollemntTreeMap';
import { useNavigate } from 'react-router-dom';

export default function SubjectOverviewPage()
{
    const { subject } = useParams();
    const [subjectCourseData, setSubjectCourseData] = useState<SubjectCourses | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const subjects = await fetchSubjectCourses(subject || "CPT_S");
            setSubjectCourseData(subjects);
        }

        fetchData();
    }, [subject]);


  const treeMapData =  map( subjectCourseData?.courses, (item) => { 
    return { 
      id: `${item.catalog_no} ${first(item.titles)}`,
      value: item.total_headcount || 0} 
    }
  )

  const onClickTreeMap = (id: string) => {
      navigate(`/course/${subject}/${id}`);
  }

  const enrollmentTreeMap = <EnrollemntTreeMap data={treeMapData} onClick={onClickTreeMap} />

    return (
        <div>
          <div className="row shadow-sm py-3 bg-black rounded-bottom">
            <div className="col">
              <h2>{subject}</h2>
              <Breadcrumbs subject={subject}/>
            </div>
          </div>

          <div className="row shadow-sm bg-black rounded-bottom">
            <div style={{ width: '100%', height: 600 }}>
                {enrollmentTreeMap}
            </div>
        </div>

        <div className="row pt-3 bg-dark-subtle">
            <br/>
            <h2>Courses (n={size(subjectCourseData?.courses)})</h2>
            <SubjectCoursesTable data={subjectCourseData}/>
        </div>
        </div>
    )
}
