import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Courses } from "../data/models";
import { fetchCourse } from "../data/dataFetch";
import { first } from "lodash";
import Breadcrumbs from "../components/Breadcrumbs";
import { CourseTable } from "../components/CourseTable";

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
        <Breadcrumbs subject={subject} catalogNo={catalogNo}/>
        <h1>{subject} {catalogNo} — {title}</h1>
        { courseData && <CourseTable data={courseData} />}
    </div>
}
