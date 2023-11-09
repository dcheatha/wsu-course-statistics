import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Courses } from "../data/models";
import { fetchCourse } from "../data/dataFetch";
import { first, size } from "lodash";
import Breadcrumbs from "../components/Breadcrumbs";
import { CourseTable } from "../components/CourseTable";
import { CourseDataInstructorLimiter } from "../util";
import { InstructorAllocationBarChart } from "../components/InstructorAllocationBarChart";
import { GradesBoxPlot } from "../components/GradesBoxPlot";
import { Pagination } from "../components/Pagination";
import { Tabs } from "../components/Tabs";


export default function CourseOverviewPage()
{
    let { subject, catalogNo } = useParams();

    catalogNo = catalogNo?.substring(0,3)


    const [courseData, setCourseData] = useState<Courses | null>(null);

    useEffect(() => {
        async function fetchData() {
            const subjects = await fetchCourse(subject || "CPT_S", catalogNo || "121");
            setCourseData(subjects);
        }

        fetchData();
    }, [subject, catalogNo]);

    const title = first(courseData?.courses)?.title || "Loading...";

    const [page, setPage] = useState(0)

    const limitedCourseData = CourseDataInstructorLimiter(courseData, page);

    const pagenation = <Pagination limitedCourseData={limitedCourseData} page={page} setPage={setPage}/>

    return <div>

          <div className="row shadow-sm py-3 bg-black rounded-bottom">
            <div className="col">
              <h2>{subject} {catalogNo} — {title}</h2>
              <Breadcrumbs subject={subject} catalogNo={catalogNo}/>
            </div>
            <div className="col d-flex align-items-center justify-content-end">
              {pagenation}
            </div>
          </div>


        <div className="row py-3 bg-black shadow">

          <Tabs tabs={[
            {
              name: 'Grade Distrubution',
              component: <GradesBoxPlot data={limitedCourseData.courseData}/>,
            },
            {
              name: 'Instructor Allocation',
              component: <InstructorAllocationBarChart data={limitedCourseData.courseData}/>,
            }
          ]} />

        </div>


        <div className="row py-3 bg-dark-subtle">
          <h2>Offerings (displaying {size(limitedCourseData.courseData?.courses)} / {size(courseData?.courses)})</h2>
          { limitedCourseData.courseData && <CourseTable data={limitedCourseData.courseData} />}
        </div>
    </div>
}
