import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Courses } from "../data/models";
import { fetchCourse } from "../data/dataFetch";
import { first } from "lodash";
import Breadcrumbs from "../components/Breadcrumbs";
import { CourseTable } from "../components/CourseTable";
import { CourseDataInstructorLimiter } from "../util";
import { PopulationSteamChart } from "../components/PopulationSteamChart";
import { GradesBoxPlot } from "../components/GradesBoxPlot";
import { Pagination } from "../components/Pagination";
import { Tabs } from "../components/Tabs";


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

    const [page, setPage] = useState(0)

    const limitedCourseData = CourseDataInstructorLimiter(courseData, page);

    const pagenation = <Pagination limitedCourseData={limitedCourseData} page={page} setPage={setPage}/>

    return <div>
        <Breadcrumbs subject={subject} catalogNo={catalogNo}/>
        <h1>{subject} {catalogNo} — {title}</h1>

        <h2>Stats</h2>

        {pagenation}

        <Tabs tabs={[
          {
            name: 'Grade Distrubution',
            component: <GradesBoxPlot data={limitedCourseData.courseData}/>,
          },
          {
            name: 'Drop Rate',
            component: <div>Todo</div>,
          },
          {
            name: 'Instructor Allocation',
            component: <PopulationSteamChart data={limitedCourseData.courseData}/>,
          }
        ]} />

        <h2>All Known Historical Offerings</h2>
        { limitedCourseData.courseData && <CourseTable data={limitedCourseData.courseData} />}
    </div>
}
